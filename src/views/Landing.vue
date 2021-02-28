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
				<h1>Mis aplicaciones</h1>
				Página principal
				<br />

				<v-switch
					v-model="isAdmin"
					:label="`Vista admin: ${isAdmin.toString()}`"
				></v-switch>
				<br />
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
									v-model="editedItem.imgdir"
									:rules="urlRules"
									label="URL Imagen"
									required
								></v-text-field>

								<v-spacer></v-spacer>
								<v-btn color="#002F6C" text @click="close">
									Cancelar
								</v-btn>
								<v-btn color="#002F6C" :disabled="!valid" text @click="save">
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
										<img alt="imgapp" :src="a.imgdir" height="90px" /><br />
									</a>
									{{ a.name }}<br />
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

	export default {
		name: "Home",
		components: {
			NabBarUser,
		},
		data() {
			return {
				isAdmin: true, //Pedirselo al kevin
				isOn: true,
				cargando: false,
				photoURL: "",
				displayName: "",
				dialog: false,
				editedIndex: -1,
				valid: true,
				nameRules: [
					v => !!v || "Debe escribir un numbre ",
					v => (v && v.length <= 20) || "Debe tener menos de 20 caracteres",
				],
				dirRules: [v => !!v || "Debe escribir la dirección de la Aplicación "],
				urlRules: [v => !!v || "Debe escribir la URL de la imagen "],
				editedItem: {
					_id: "",
					name: "",
					url: "",
					imgdir: "",
				},
				defaultItem: {
					_id: "",
					name: "",
					url: "",
					imgdir: "",
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
			let res = await fetch("/list-apps", {
				method: "get",
				credentials: "include",
			});
			if (res.status == 200) {
				const aplicaciones = await fetch.get("/list-apps");
				this.apps = aplicaciones;
			}
		},*/
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
				this.apps.splice(this.editedIndex, 1);
				this.closeDelete();
				//Borrar arriba y descomentar
				/*
						fetch("/borrar-app" + this.editedIndex.id,
						{
							method: "DELETE",
								credentials: "include",
							body: data
						})
						*/
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
			save() {
				if (
					this.editedItem.name != "" &&
					this.editedItem.url != "" &&
					this.editedItem.imgdir != ""
				) {
					if (this.editedIndex > -1) {
						Object.assign(this.apps[this.editedIndex], this.editedItem);
						//Borrar arriba y descomentar
						/*var data = new FormData();
					data.append( "json", JSON.stringify( this.editedIndex ) );
					fetch("/crear-app",
					{
						method: "POST",
						body: data,
							credentials: "include",
					})
					.then(function(res){ return res.json(); })
					.then(function(data){ alert( JSON.stringify( data ) ) })*/
					} else {
						this.apps.push(this.editedItem);
						//Borrar arriba y descomentar
						/*var data = new FormData();
					data.append( "json", JSON.stringify( this.editedItem ) );
					fetch("/editar-app",
					{
						method: "PUSH",
						body: data,
							credentials: "include",
					})
					.then(function(res){ return res.json(); })
					.then(function(data){ alert( JSON.stringify( data ) ) })*/
					}
					this.close();
				}
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
