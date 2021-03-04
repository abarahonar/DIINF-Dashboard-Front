<template>
	<div class="LandingAdmin">
		<NabBarUser
			v-bind:photoURL="photoURL"
			v-bind:displayName="displayName"
			v-bind:isAdmin="isAdmin"
			v-bind:isOn="isOn"
		/>

		<v-container class="grey lighten-6" v-show="!cargando">
			<v-progress-circular
				indeterminate
				v-show="!dialogError"
			></v-progress-circular>

			<v-card v-show="dialogError">
				<v-toolbar color="#EA7600" dark flat>
					<v-toolbar-title
						>Ha ocurrido un error al intentar iniciar sesión
					</v-toolbar-title>
				</v-toolbar>
				<div class="padding">
					Error tipo {{ logStattus }}, contactarse con un administrador para
					conocer más detalle.
				</div>
				<v-btn color="#002F6C" text @click="closeError">
					Volver al Login
				</v-btn>
			</v-card>
		</v-container>

		<v-container class="grey lighten-6" v-show="cargando">
			<v-app id="generalPage">
				<h1>Mis aplicaciones</h1>
				Página principal

				<br />
				Rol: <span v-for="elem in rol" :key="elem">{{ elem }} </span><br />
				<v-dialog v-model="dialog" max-width="500px">
					<template v-slot:activator="{ on, attrs }">
						<v-btn
							v-show="isAdmin === true"
							dark
							class="ma-2"
							color="#002F6C"
							v-bind="attrs"
							v-on="on"
						>
							Nueva App
						</v-btn>
					</template>
					<v-card>
						<v-toolbar color="#EA7600" dark flat>
							<v-toolbar-title>{{ formTitle }}</v-toolbar-title>
						</v-toolbar>

						<v-form ref="form" v-model="valid" lazy-validation>
							<div class="padding">
								<v-text-field
									v-model="editedItem.name"
									:rules="nameRules"
									block
									label="Nombre Aplicacion"
									required
								></v-text-field>

								<v-text-field
									v-model="editedItem.url"
									:rules="dirRules"
									label="Direccion"
									required
								></v-text-field>

								<v-text-field
									v-model="editedItem.img"
									:rules="urlRules"
									label="URL Imagen"
									required
								></v-text-field>

								<v-spacer></v-spacer>
								<v-btn color="#002F6C" text @click="close">
									Cancelar
								</v-btn>
								<v-btn
									color="#002F6C"
									:disabled="!valid"
									text
									@click="save(editedItem)"
								>
									Guardar Aplicación
								</v-btn>
							</div>
						</v-form>
					</v-card>
				</v-dialog>
				<v-dialog v-model="dialogDelete" max-width="500px">
					<v-card>
						<v-toolbar color="#EA7600" dark flat>
							<v-toolbar-title>Borrar Aplicación</v-toolbar-title>
						</v-toolbar>
						<br />
						¿Seguro que quiere eliminar la aplicación?
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="#002F6C" text @click="closeDelete">Cancelar</v-btn>
							<v-btn color="#002F6C" text @click="deleteItemConfirm"
								>Borrar Aplicacion</v-btn
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
						<v-row dense>
							<v-col v-for="a in apps" :key="a.name" :cols="6" sm="6">
								<v-card outlined>
									<br />
									<a :href="a.url">
										<img alt="imgapp" :src="a.img" height="90px" /><br />
										{{ a.name }}
									</a>
									<br />
									<div class="right-buttons">
										<v-btn
											v-show="isAdmin === true"
											icon
											@click="editItem(a)"
											fab
											small
											flat
										>
											<v-icon>mdi-pencil</v-icon>
										</v-btn>

										<v-btn
											v-show="isAdmin === true"
											icon
											@click="deleteItem(a)"
											fab
											flat
											small
										>
											<v-icon>mdi-delete</v-icon>
										</v-btn>
									</div>

									<br /><br />
								</v-card>
							</v-col>
						</v-row>
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
				res: [],
				logStattus: 0,
				isAdmin: false,
				isOn: true,
				cargando: false,

				photoURL: "",
				displayName: "",
				dialog: false,
				dialogDelete: false,
				dialogError: false,
				editedIndex: -1,
				valid: true,
				rol: [],
				nameRules: [
					v => !!v || "Debe escribir un numbre ",
					v => (v && v.length <= 20) || "Debe tener menos de 20 caracteres",
				],
				dirRules: [v => !!v || "Debe escribir la dirección de la Aplicación "],
				urlRules: [v => !!v || "Debe escribir la URL de la imagen "],
				editedItem: {
					name: "",
					url: "",
					img: "",
				},
				defaultItem: {
					name: "",
					url: "",
					img: "",
				},
				apps: [],
			};
		},
		computed: {
			formTitle() {
				return this.editedIndex === -1
					? "Nueva Aplicación"
					: "Editar Aplicación";
			},
		},

		watch: {
			dialogError(val) {
				val || this.closeError();
			},
			dialog(val) {
				val || this.close();
			},
			dialogDelete(val) {
				val || this.closeDelete();
			},
		},

		async beforeCreate() {
			let res = await fetch("https://back.catteam.tk/verify", {
				method: "get",
				credentials: "include",
			});

			if (res.status != 200) {
				console.log(res.status);
				this.dialogError = true;
				if (res.status == 500) {
					console.log("error 500");
					this.logStattus = 500;
				} else if (res.status === 400) {
					console.log("error 400");
					this.logStattus = 400;
				} else {
					this.logStattus = res.status;
				}

				//this.$router.push("/login");
				//Si res status != 200 el usuario no esta logeado -> Redireccionar
			} else {
				const user = await res.json();
				this.displayName = user.name;
				this.photoURL = user.picture;
				this.cargando = true;
			}
		},
		async mounted() {
			let res = await fetch("https://back.dashboard.catteam.tk/user-apps", {
				method: "get",
				credentials: "include",
			});
			if (res.status == 200) {
				const aplicaciones = await res.json();
				this.res = aplicaciones.res;
				this.rol = [];
				this.apps = [];
				console.log(this.res);
				for (const elem of this.res) {
					this.rol.push(elem.name);
					this.apps = this.apps.concat(JSON.parse(elem.apps));
					console.log(elem.apps);
					console.log(this.apps);
				}
				//this.rol = this.res.name;
				//this.apps = JSON.parse(this.res.apps);
				for (const actualrol of this.rol) {
					if (actualrol == "Administrators") {
						this.isAdmin = true;
						let res = await fetch(
							"https://back.dashboard.catteam.tk/list-apps",
							{
								method: "get",
								credentials: "include",
							}
						);
						if (res.status == 200) {
							const aplicaciones = await res.json();
							this.apps = aplicaciones;
						}
					} else {
						this.isAdmin = false;
					}
				}
			}
		},
		methods: {
			async logOut() {
				let res = await fetch("https://back.catteam.tk/logout", {
					method: "delete",
					credentials: "include",
				});
				if (res.ok) {
					console.log("Del done");
				}
			},
			goto(item) {
				this.item = item;
				this.$router.push({ path: item });
			},
			editItem(item) {
				this.editedIndex = this.apps.indexOf(item);
				this.editedItem = Object.assign({}, item);
				this.dialog = true;
			},
			deleteItem(item) {
				this.editedIndex = this.apps.indexOf(item);
				this.editedItem = Object.assign({}, item);
				this.dialogDelete = true;
			},
			deleteItemConfirm() {
				let item = this.editedItem;
				let formdata = new FormData();
				formdata.append("id", item._id);
				formdata.append("app_name", item.name);
				formdata.append("app_url", item.url);
				formdata.append("img", item.img);
				console.log(formdata);
				axios
					.post("https://back.dashboard.catteam.tk/delete-app", formdata)
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
			closeError() {
				this.dialogError = false;
				this.$router.push("/login");
			},
			save(item) {
				if (item.name != "" && item.url != "") {
					if (this.editedIndex > -1) {
						let formdata = new FormData();
						formdata.append("id", item._id);
						formdata.append("app_name", item.name);
						formdata.append("app_url", item.url);
						formdata.append("img", item.img);
						console.log(formdata);
						axios
							.post("https://back.dashboard.catteam.tk/update-app", formdata)
							//.then(response => response.text())
							.then(result => console.log(result))
							.catch(error => console.log("error", error));
					} else {
						let formdata = new FormData();
						formdata.append("app_name", item.name);
						formdata.append("app_url", item.url);
						formdata.append("img", item.img);
						console.log(formdata);
						axios
							.post("https://back.dashboard.catteam.tk/create-app", formdata)
							.then(result => console.log(result))
							.catch(error => console.log("error", error));
					}
				}
				this.close();
			},
		},
	};
</script>

<style lang="scss" scoped>
	.overflow-y {
		overflow-y: auto;
	}
	.textblock {
		margin-top: 70px;
		padding: 25px;
		text-align: justify;
	}
	.padding {
		padding: 25px;
	}
	.right-buttons {
		text-align: right;
		padding: 10px;
	}
</style>
