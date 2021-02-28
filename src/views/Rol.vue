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

								<v-autocomplete
									v-model="editedItem.Apps"
									:items="listApp"
									filled
									chips
									color="blue-grey lighten-2"
									label="Aplicaciones"
									item-text="name"
									return-object
									multiple
								>
									<template v-slot:selection="data">
										<v-chip
											v-bind="data.attrs"
											:input-value="data.selected"
											close
											@click="data.select"
											@click:close="remove(data.item)"
										>
											{{ data.item.name }}
										</v-chip>
									</template>
									<template v-slot:item="data">
										<template v-if="typeof data.item !== 'object'">
											<v-list-item-content
												v-text="data.item"
											></v-list-item-content>
										</template>
										<template v-else>
											<v-list-item-content>
												<v-list-item-title
													v-html="data.item.name"
												></v-list-item-title>
											</v-list-item-content>
										</template>
									</template>
								</v-autocomplete>
								{{ defaultApps }}
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
							<v-toolbar-title>Borrar Aplicación</v-toolbar-title>
						</v-toolbar>
						<br />
						¿Seguro que quiere eliminar este Rol?
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="#002F6C" text @click="closeDelete">Cancelar</v-btn>
							<v-btn color="#002F6C" text @click="deleteItemConfirm"
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
									<v-chip v-for="app in a.Apps" :key="app.id">
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
				listApp: [
					/*{
						_id: "123ad",
						name: "Calendario",
						url: "rol",
						imgdir: "http://vaibs.com.mx/wp-content/uploads/2020/05/mail.png",
					},
					{
						_id: "123fffsd",
						name: "Datos curriculares",
						url: "rol",
						imgdir: "http://vaibs.com.mx/wp-content/uploads/2020/05/mail.png",
					},
					{
						_id: "123",
						name: "Finanzas",
						url: "rol",
						imgdir: "http://vaibs.com.mx/wp-content/uploads/2020/05/mail.png",
					},
					{
						_id: "123",
						name: "App Prueba",
						url: "rol",
						imgdir: "http://vaibs.com.mx/wp-content/uploads/2020/05/mail.png",
					},*/
				],
				defaultItem: {
					name: "",
					text: "",
					Apps: [],
				},
				editedItem: {
					name: "",
					text: "",
					Apps: [],
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
		/*async mounted() {
			let res = await fetch("/list-roles", {
				method: "get",
				credentials: "include",
			});
			if (res.status == 200) {
				const rol = await fetch.get("/list-roles");
				this.roles = rol;
			}
			let res = await fetch("/list-apps", {
				method: "get",
				credentials: "include",
			});
			if (res.status == 200) {
				const aplicaciones = await fetch.get("/list-apps");
				this.listApp = aplicaciones;
			}
		},*/

		methods: {
			remove(item) {
				const index = this.editedItem.Apps.indexOf(item);
				if (index >= 0) this.editedItem.Apps.splice(index, 1);
			},
			goto(item) {
				this.item = item;
				this.$router.push({ path: item });
			},

			save() {
				if (this.editedIndex > -1) {
					Object.assign(this.roles[this.editedIndex], this.editedItem);
				} else {
					this.roles.push(this.editedItem);
					//axios.post("https://localhost/create-role", this.editedItem);
					this.editedItem = Object.assign({}, this.defaultItem);
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
				this.roles.splice(this.editedIndex, 1);
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
