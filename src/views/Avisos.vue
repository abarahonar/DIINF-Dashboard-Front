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
				<h1>Avisos</h1>

				Vista de Avisos<br />
				Crear, editar y borrar avisos.
				<br /><br /><br /><br /><br /><br />
				<v-dialog v-model="dialog" max-width="500px">
					<template v-slot:activator="{ on, attrs }">
						<v-btn dark class="ma-2" color="#002F6C" v-bind="attrs" v-on="on">
							Crear Aviso
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
									v-model="editedItem.title"
									:counter="40"
									:rules="titleRules"
									label="Titulo"
									required
								></v-text-field>

								<v-textarea
									required
									v-model="editedItem.text"
									:rules="messageRules"
									:counter="320"
									label="Mensaje"
								></v-textarea>

								<v-overflow-btn
									v-model="editedItem.color"
									label="Tipo de aviso"
									class="my-2"
									:items="types"
									item-value="color"
									item-text="name"
									required
									dense
								></v-overflow-btn>

								<v-btn color="#002F6C" text @click="close">
									Cancelar
								</v-btn>
								<v-btn color="#002F6C" :disabled="!valid" text @click="save">
									Guardar Aviso
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
						¿Seguro que quiere eliminar este aviso?
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="#002F6C" text @click="closeDelete">Cancelar</v-btn>
							<v-btn color="#002F6C" text @click="deleteItemConfirm"
								>Borrar Aviso</v-btn
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
						<v-banner
							v-for="a in avisos"
							:key="a.name"
							two-line
							transition="slide-y-transition"
						>
							<v-avatar slot="icon" :color="a.color" size="40">
								<v-icon icon="mdi-lock" large color="white">
									mdi-information-outline
								</v-icon>
							</v-avatar>

							<h3>
								{{ a.title }}
							</h3>
							<div class="justify-text">
								{{ a.text }}
							</div>
							<div class="right-buttons">
								11 de Enero de 2021<br />
								<v-btn icon @click="editItem(a)" fab small flat>
									<v-icon>mdi-pencil</v-icon>
								</v-btn>
								<v-btn icon @click="deleteItem(a)" fab flat small>
									<v-icon>mdi-delete</v-icon>
								</v-btn>
							</div>
						</v-banner>
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
				cargando: false,
				isOn: true,
				isAdmin: true,
				overflow: "",
				dialog: false,
				editedIndex: -1,
				valid: true,

				titleRules: [
					v => !!v || "El aviso debe tener un título",
					v => (v && v.length <= 40) || "Debe tener menos de 40 caracteres",
				],
				messageRules: [
					v => !!v || "El aviso debe tener un mensaje",
					v => (v && v.length <= 320) || "Debe tener menos de 320 caracteres",
				],
				photoURL: "",
				displayName: "",
				email: "",
				types: [
					{
						name: "Aviso",
						color: "#fae73e",
					},
					{
						name: "Error",
						color: "#ff153c",
					},
					{
						name: "Informacion",
						color: "#64acfe",
					},
				],
				defaultItem: {
					title: "",
					text: "",
					color: "",
					date: "",
				},
				editedItem: {
					title: "",
					text: "",
					color: "",
					date: "",
				},
				avisos: [
					/*{
						title: "Aviso 1",
						text:
							"Aqui va aviso 1. Lorem Ipsum is simply dummy Lorem Ipsum is simply dummy Lorem Ipsum is simply dummy Lorem Ipsum is simply dummy Lorem Ipsum is simply dummy Lorem Ipsum is simply dummy ",
						color: "blue lighten-2",
					},*/
				],
			};
		},
		computed: {
			formTitle() {
				return this.editedIndex === -1 ? "Nuevo Aviso" : "Editar Aviso";
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
		/*async mounted() {
			let res = await fetch("/avisos", {
				method: "get",
				credentials: "include",
			});
			if (res.status == 200) {
				const avisos = await fetch.get("/avisos");
				this.avisos = avisos;

			}
		},*/
		async mounted() {
			let res = await fetch("https://back.catteam.tk/verify", {
				method: "get",
				credentials: "include",
			});

			if (res.status != 200) {
				this.$router.push("/login");
			} else {
				const user = await res.json();
				this.displayName = user.name;
				this.photoURL = user.picture;
				this.cargando = true;
			}
		},

		methods: {
			goto(item) {
				this.item = item;
				this.$router.push({ path: item });
			},
			save() {
				if (this.editedItem.title != "" && this.editedItem.text != "") {
					if (this.editedIndex > -1) {
						Object.assign(this.avisos[this.editedIndex], this.editedItem);
					} else {
						this.avisos.push(this.editedItem);
						this.editedItem = Object.assign({}, this.defaultItem);
					}
					this.close();
				}
			},
			editItem(item) {
				this.editedIndex = this.avisos.indexOf(item);
				this.editedItem = Object.assign({}, item);
				this.dialog = true;
			},

			deleteItem(item) {
				this.editedIndex = this.avisos.indexOf(item);
				this.editedItem = Object.assign({}, item);
				this.dialogDelete = true;
			},

			deleteItemConfirm() {
				this.avisos.splice(this.editedIndex, 1);
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
		padding: 6px;
		margin-top: 6px;
		text-align: left;
		margin-bottom: 6px;
		color: #4d4949;
	}
	.padding {
		padding: 25px;
	}
</style>
