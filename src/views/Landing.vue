<template>
	<div class="LandingAdmin">
		<NabBarUser
			v-bind:photoURL="photoURL"
			v-bind:displayName="displayName"
			v-bind:isAdmin="isAdmin"
			v-bind:isOn="isOn"
		/>
		<v-container class="grey lighten-6">
			<v-app id="generalPage">
				<h1>Landing page</h1>
				En esta vista se pueden ver las aplicaciones :)
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

									<v-btn
										v-show="isAdmin === true"
										color="#EA7600"
										@click="editItem(a)"
										fab
										small
										dark
									>
										<v-icon>mdi-pencil</v-icon>
									</v-btn>
									<v-btn
										v-show="isAdmin === true"
										color="#EA7600"
										@click="deleteItem(a)"
										fab
										small
										dark
									>
										<v-icon>mdi-delete</v-icon>
									</v-btn>

									<br /><br />
								</v-card>
							</v-col>
						</v-row>
					</v-card-text>
				</v-card>
			</v-app>
		</v-container>
		<v-footer padless>
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
	import firebase from "firebase";
	import axios from "axios";
	import NabBarUser from "@/components/Nav_BarUser.vue";

	export default {
		name: "Home",
		components: {
			NabBarUser,
		},
		data() {
			return {
				//apps: [],
				isAdmin: true,
				isOn: true,
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
					name: "",
					url: "",
					imgdir: "",
				},
				defaultItem: {
					name: "",
					url: "",
					imgdir: "",
				},
				flex: "3",
				photoURL: "",
				displayName: "",
				email: "",
				apps: [
					{
						name: "Rol",
						url: "rol",
						imgdir: "http://vaibs.com.mx/wp-content/uploads/2020/05/mail.png",
					},
					{
						name: "Avisos",
						url: "avisos",
						imgdir: "http://vaibs.com.mx/wp-content/uploads/2020/05/mail.png",
					},
					{
						name: "Aplicacion 3",
						url: "UWU",
						imgdir:
							"http://vaibs.com.mx/wp-content/uploads/2020/05/icone-youtube-branco-png-6.png",
					},
					{
						name: "Aplicacion 4",
						url: "UWU",
						imgdir: "http://vaibs.com.mx/wp-content/uploads/2020/05/mail.png",
					},
					{
						name: "Aplicacion 5",
						url: "UWU",
						imgdir: "http://vaibs.com.mx/wp-content/uploads/2020/05/mail.png",
					},
					{
						name: "Aplicacion 6",
						url: "UWU",
						imgdir: "http://vaibs.com.mx/wp-content/uploads/2020/05/mail.png",
					},
					{
						name: "Aplicacion 7",
						url: "UWU",
						imgdir: "http://vaibs.com.mx/wp-content/uploads/2020/05/mail.png",
					},
					{
						name: "Aplicacion 8",
						url: "UWU",
						imgdir: "http://vaibs.com.mx/wp-content/uploads/2020/05/mail.png",
					},
					{
						name: "Aplicacion 9",
						url: "UWU",
						imgdir: "http://vaibs.com.mx/wp-content/uploads/2020/05/mail.png",
					},
					{
						name: "Aplicacion 10",
						url: "UWU",
						imgdir: "http://vaibs.com.mx/wp-content/uploads/2020/05/mail.png",
					},
					{
						name: "Aplicacion 11",
						url: "UWU",
						imgdir: "http://vaibs.com.mx/wp-content/uploads/2020/05/mail.png",
					},
				],
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

		created() {
			const user = firebase.auth().currentUser;
			this.displayName = user.displayName;
			this.email = user.email;
			this.photoURL = user.photoURL;
			this.initialize();
		},
		mounted() {
			axios
				.get("http://localhost:80/list-apps")
				.then(response => (this.apps = response.data));
		},
		methods: {
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
				if (this.editedIndex > -1) {
					Object.assign(this.apps[this.editedIndex], this.editedItem);
				} else {
					this.apps.push(this.editedItem);
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
</style>