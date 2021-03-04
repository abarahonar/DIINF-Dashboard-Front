<template>
	<div class="LandingAdmin">
		<NabBarUser
			v-bind:photoURL="photoURL"
			v-bind:displayName="displayName"
			v-bind:isAdmin="isAdmin"
			v-bind:isOn="isOn"
		/>
		<v-container class="grey lighten-6" v-show="!cargando">
			<v-progress-circular indeterminate></v-progress-circular>
		</v-container>
		<v-container class="grey lighten-6" v-show="cargando">
			<v-app id="generalPage">
				<h1>Roles</h1>

				Vista de Roles<br />
				Crear, editar y borrar un rol. Asignar aplicaciones.
				<br /><br /><br /><br /><br /><br />
				<v-dialog v-model="dialog" max-width="500px">
					<template v-slot:activator="{ on, attrs }">
						<v-btn dark class="ma-2" color="#002F6C" v-bind="attrs" v-on="on">
							Crear nuevo Rol
						</v-btn>
						<br />
					</template>
					<v-card>
						<v-toolbar color="#EA7600" dark flat>
							<v-toolbar-title>{{ formTitle }}</v-toolbar-title>
						</v-toolbar>

						<v-form ref="form" v-model="valid" lazy-validation>
							<div class="padding">
								<v-text-field
									v-model="editedItem.name"
									:counter="40"
									:rules="titleRules"
									label="Nombre Rol"
									required
								></v-text-field>

								<v-overflow-btn
									class="my-2"
									v-model="editedItem.apps"
									:items="listApp"
									item-text="name"
									label="Aplicacion"
									filled
									return-object
								>
								</v-overflow-btn>
								<v-btn color="#002F6C" text @click="close">
									Cancelar
								</v-btn>
								<v-btn color="#002F6C" :disabled="!valid" text @click="save">
									Guardar
								</v-btn>
							</div>
						</v-form>
					</v-card>
				</v-dialog>

				<v-dialog v-model="dialogDelete" max-width="500px">
					<v-card>
						<v-toolbar color="#EA7600" dark flat>
							<v-toolbar-title>Borrar Rol</v-toolbar-title>
						</v-toolbar>
						<br />
						¿Seguro que quiere eliminar este Rol?
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="#002F6C" text @click="closeDelete">Cancelar</v-btn>
							<v-btn color="#002F6C" text @click="deleteItemConfirm()"
								>Borrar Rol</v-btn
							>
							<v-spacer></v-spacer>
						</v-card-actions>
					</v-card>
				</v-dialog>

				<v-card
					v-scroll.self
					class="overflow-y"
					outlined
					tile
					max-height="708px"
				>
					<v-card-text>
						<v-col v-for="a in roles" :key="a.name" :cols="12">
							<v-card>
								<v-card :color="color" flat
									><h2>{{ a.name }}</h2></v-card
								>
								<div class="justify-text">
									Aplicaciones:
									<br />
									<v-chip v-for="app in JSON.parse(a.apps)" :key="app.id">
										<strong>{{ app.name }}</strong>
									</v-chip>
								</div>
								<div class="right-buttons">
									<v-btn icon @click="editItem(a)" fab small flat>
										<v-icon>mdi-pencil</v-icon>
									</v-btn>

									<v-btn icon @click="deleteItem(a)" fab flat small>
										<v-icon>mdi-delete</v-icon>
									</v-btn>
								</div>
							</v-card>
						</v-col>
					</v-card-text>
				</v-card>
			</v-app>
		</v-container>
		<v-footer padless v-show="cargando">
			<v-card
				flat
				color="#EA7600"
				tile
				width="100%"
				class="lighten-1 text-center"
			>
				<v-divider></v-divider>

				<v-card-text class="white--text">
					{{ new Date().getFullYear() }} <strong></strong>
				</v-card-text>
			</v-card>
		</v-footer>
	</div>
</template>

<script>
	import NabBarUser from "@/components/Nav_BarUser.vue";
	const axios = require("axios");
	axios.defaults.headers.post["Content-Type"] = "application/json";
	axios.defaults.withCredentials = true;
	axios.defaults.xsrfCookieName = "csrftoken";
	axios.defaults.xsrfHeaderName = "X-CSRFToken";
	export default {
		name: "Home",
		components: {
			NabBarUser,
		},
		data() {
			return {
				isAdmin: true,
				isOn: true,
				cargando: false,
				overflow: "",
				dialog: false,
				editedIndex: -1,
				valid: true,
				color: "#b1b1b1",
				nameRules: [
					v => !!v || "El rol debe tener un nombre",
					v => (v && v.length <= 40) || "Debe tener menos de 40 caracteres",
				],
				photoURL: "",
				displayName: "",
				email: "",
				roles: [],
				appuser: [],
				listApp: [],
				defaultItem: {
					name: "",
					apps: [],
				},
				editedItem: {
					name: "",
					apps: [],
				},
			};
		},
		computed: {
			formTitle() {
				return this.editedIndex === -1 ? "Nuevo Rol" : "Editar Rol";
			},
		},

		watch: {
			dialog(val) {
				val || this.close();
			},
			dialogDelete(val) {
				val || this.closeDelete();
			},
		},
		async mounted() {
			let res = await fetch("https://back.dashboard.catteam.tk/list-apps", {
				method: "get",
				credentials: "include",
			});
			if (res.status == 200) {
				const aplicaciones = await res.json();
				this.listApp = aplicaciones;
			}

			let res2 = await fetch("https://back.dashboard.catteam.tk/list-roles", {
				method: "get",
				credentials: "include",
			});
			if (res2.status == 200) {
				const rol = await res2.json();
				this.roles = rol;

				//Falta poder transformar Apps a Json y asi obtener los datos
			}
		},

		async beforeCreate() {
			let res = await fetch("https://back.catteam.tk/verify", {
				method: "get",
				credentials: "include",
			});
			if (res.status != 200) {
				this.$router.push("/login");
				//Si res status != 200 el usuario no esta logeado -> Redireccionar
			} else {
				const user = await res.json();
				this.displayName = user.name;
				this.photoURL = user.picture;
				this.cargando = true;
			}
		},

		methods: {
			parsejson() {
				this.appuser = this.roles.name;
			},
			remove(item) {
				const index = this.editedItem.apps.indexOf(item);
				if (index >= 0) this.editedItem.apps.splice(index, 1);
			},
			goto(item) {
				this.item = item;
				this.$router.push({ path: item });
			},

			save() {
				if (this.editedItem.name != "") {
					if (this.editedIndex > -1) {
						let formdata = new FormData();
						formdata.append("role_id", this.editedItem._id);
						formdata.append("app_id", this.editedItem.apps._id);

						console.log("formdata");
						console.log(formdata);
						axios
							.post("https://back.dashboard.catteam.tk/add-app", formdata)
							.then(result => console.log(result))
							.catch(error => console.log("error", error));
					} else {
						//Para editar un rol

						let formdata = new FormData();
						formdata.append("role_name", this.editedItem.name);

						console.log(formdata);
						axios
							.post("https://back.dashboard.catteam.tk/create-role", formdata)
							.then(result => console.log(result))
							.catch(error => console.log("error", error));
					}
				}
				this.close();
			},
			editItem(item) {
				this.editedIndex = this.roles.indexOf(item);
				this.editedItem = Object.assign({}, item);
				this.dialog = true;
			},

			deleteItem(item) {
				this.editedIndex = this.roles.indexOf(item);
				this.editedItem = Object.assign({}, item);
				this.dialogDelete = true;
			},

			deleteItemConfirm() {
				let item = this.editedItem;
				let formdata = new FormData();
				formdata.append("id", item._id);
				formdata.append("role_name", item.name);
				console.log(item._id);
				axios
					.post("https://back.dashboard.catteam.tk/delete-role", formdata)
					//.then(response => response.text())
					.then(result => console.log(result))
					.catch(error => console.log("error", error));

				this.closeDelete();
			},

			close() {
				this.dialog = false;
				this.$nextTick(() => {
					this.editedItem = Object.assign({}, this.defaultItem);
					this.editedIndex = -1;
				});
			},

			closeDelete() {
				this.dialogDelete = false;
				this.$nextTick(() => {
					this.editedItem = Object.assign({}, this.defaultItem);
					this.editedIndex = -1;
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.textblock {
		margin-top: 70px;
		padding: 25px;
		text-align: justify;
	}
	.overflow-y {
		overflow-y: auto;
	}
	.right-buttons {
		text-align: right;
		padding: 10px;
	}
	.justify-text {
		margin-left: 10px;
		margin-right: 10px;

		text-align: justify;
	}
	h2 {
		padding: 10px;
		margin-top: 10px;
		text-align: left;
		margin-bottom: 10px;
		color: #ffffff;
	}
	.padding {
		padding: 25px;
	}
</style>
