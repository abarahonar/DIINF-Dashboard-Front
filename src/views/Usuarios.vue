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
				<h1>Usuarios</h1>
				Vista de Usuarios<br />
				Asignar Roles y Activar/Desactivar cuenta.
				<h1>Las funcionalidades de esta vista no están activas</h1>
				<v-dialog v-model="dialog" max-width="500px">
					<template v-slot:activator="{ on, attrs }">
						<v-btn
							disabled
							dark
							class="ma-2"
							color="#002F6C"
							v-bind="attrs"
							v-on="on"
						>
							Crear Usuario
						</v-btn>
						<br />
					</template>
					<v-card>
						<v-toolbar color="#EA7600" dark flat>
							<v-toolbar-title>{{ formTitle }}</v-toolbar-title>
						</v-toolbar>

						<v-form ref="form" v-model="valid" lazy-validation>
							<div class="padding">
								{{ editedItem.name }} - {{ editedItem.email }}

								<v-checkbox
									v-model="editedItem.active"
									color="success"
									label="Usuario activo"
								></v-checkbox>
								<v-autocomplete
									v-model="editedItem.roles"
									:items="listApp"
									filled
									chips
									color="blue-grey lighten-2"
									label="Roles"
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
							<v-toolbar-title>Borrar Usuario</v-toolbar-title>
						</v-toolbar>
						<br />
						¿Seguro que quiere eliminar este Usuario?
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="#002F6C" text @click="closeDelete">Cancelar</v-btn>
							<v-btn color="#002F6C" text @click="deleteItemConfirm"
								>Borrar Usuario</v-btn
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
					<v-data-table
						:headers="headers"
						:items="usuarios"
						sort-by="name"
						class="elevation-1"
					>
						<template v-slot:item.roles="{ item }">
							<v-chip v-for="rol in item.roles" :key="rol.id">
								<strong>{{ rol.name }}</strong>
							</v-chip>
						</template>
						<template v-slot:item.active="{ item }">
							<v-chip :color="getColor(item.active)" dark> </v-chip>
						</template>
						<template v-slot:item.actions="{ item }">
							<v-icon small class="mr-2" @click="editItem(item)">
								mdi-pencil
							</v-icon>
							<v-icon small @click="deleteItem(item)">
								mdi-delete
							</v-icon>
						</template>
						<template v-slot:no-data>
							<v-skeleton-loader
								v-bind="attrs"
								type="image"
							></v-skeleton-loader>
						</template>
					</v-data-table>
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
				headers: [
					{
						text: "Nombre",
						align: "start",
						sortable: false,
						value: "name",
					},
					{ text: "Correo", value: "email" },
					{ text: "Roles", value: "roles" },
					{ text: "Activo", value: "active" },

					{ text: "Acciones", value: "actions", sortable: false },
				],
				isAdmin: true,
				isOn: true,
				cargando: false,
				overflow: "",
				dialog: false,
				editedIndex: -1,
				valid: true,
				color: "#b1b1b1",
				nameRules: [
					v => !!v || "El Usuario debe tener un nombre",
					v => (v && v.length <= 40) || "Debe tener menos de 40 caracteres",
				],
				emailRules: [
					v => !!v || "El Usuario debe tener un Correo",
					v => (v && v.length <= 35) || "Debe tener menos de 35 caracteres",
				],
				photoURL: "",
				displayName: "",
				email: "",
				defaultItem: {
					name: "",
					email: "",
					active: true,
					roles: [],
				},
				editedItem: {
					name: "",
					email: "",
					active: true,
					roles: [],
				},
				usuarios: [],
			};
		},
		computed: {
			formTitle() {
				return this.editedIndex === -1 ? "Nuevo Usuario" : "Editar Usuario";
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
		methods: {
			getColor(active) {
				if (active == true) return "green";
				else return "red";
			},
			remove(item) {
				const index = this.editedItem.roles.indexOf(item);
				if (index >= 0) this.editedItem.roles.splice(index, 1);
			},
			goto(item) {
				this.item = item;
				this.$router.push({ path: item });
			},

			save() {
				if (this.editedIndex > -1) {
					Object.assign(this.usuarios[this.editedIndex], this.editedItem);
				} else {
					this.usuarios.push(this.editedItem);
					this.editedItem = Object.assign({}, this.defaultItem);
				}
				this.close();
			},
			editItem(item) {
				this.editedIndex = this.usuarios.indexOf(item);
				this.editedItem = Object.assign({}, item);
				this.dialog = true;
			},

			deleteItem(item) {
				this.editedIndex = this.usuarios.indexOf(item);
				this.editedItem = Object.assign({}, item);
				this.dialogDelete = true;
			},

			deleteItemConfirm() {
				this.usuarios.splice(this.editedIndex, 1);
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
	h3 {
		padding: 10px;
		margin-top: 10px;
		text-align: left;
		margin-bottom: 10px;
		color: #404e61;
	}
	.padding {
		padding: 25px;
	}
</style>
