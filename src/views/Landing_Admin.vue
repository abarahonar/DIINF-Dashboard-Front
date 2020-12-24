<template>
	<div class="LandingAdmin">
		<NabBarUser v-bind:photoURL="photoURL" v-bind:displayName="displayName" />
		<v-container class="grey lighten-6">
			<v-app id="generalPage">
				<v-row no-gutters>
					<v-col cols="12" sm="6" md="8">
						<br /><br />
						<h1>Aplicaciones del sistema</h1>

						<v-card
							v-scroll.self
							class="overflow-y"
							outlined
							tile
							height="428px"
							max-width="760px"
						>
							<v-card-text>
								<v-row dense>
									<v-col v-for="a in apps" :key="a.name" :cols="4">
										<v-card outlined max-width="260px">
											<br />
											<img alt="imgapp" :src="a.imgdir" height="90px" /><br />
											{{ a.name }}<br />
											<v-btn
												color="#EA7600"
												fab
												x-small
												dark
												@click="goto(a.url)"
											>
												<v-icon>mdi-note</v-icon>
											</v-btn>
											<a :href="a.url">
												<v-btn color="#EA7600" fab x-small dark>
													<v-icon>mdi-wrench</v-icon>
												</v-btn>
											</a>

											<br /><br />
										</v-card>
									</v-col>
								</v-row>
							</v-card-text>
						</v-card>
					</v-col>
					<v-col cols="6" md="4">
						<br /><br /><br /><br />

						<v-divider></v-divider><br />

						<div class="textblock">
							Lorem Ipsum is simply dummy text of the printingase of Letraset
							sheets containing Lorem Ipsum passages, and more recently with
							desktop publishing software like Aldus PageMaker including
							versionsf the printing and of Lorem Ipsum.
							<br />
							Lorem Ipsum is simply dummy text of the printingase of Letraset
							sheets containing Lorem Ipsum passages, and more recently with
							desktop publishing software like Aldus PageMaker including
							versionsf the printing and of Lorem Ipsum.
							<br /><br />

							<v-dialog v-model="dialog" max-width="500px">
								<template v-slot:activator="{ on, attrs }">
									<v-btn
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
									<v-card-title>
										<span class="headline">{{ formTitle }}</span>
									</v-card-title>

									<v-card-text>
										<v-container>
											<v-row>
												<v-col cols="12" sm="6" md="4">
													<v-text-field
														v-model="editedItem.name"
														label="Nombre Aplicacion"
													></v-text-field>
												</v-col>
												<v-col cols="12" sm="6" md="4">
													<v-text-field
														v-model="editedItem.url"
														label="Direccion"
													></v-text-field>
												</v-col>
												<v-col cols="12" sm="6" md="4">
													<v-text-field
														v-model="editedItem.imgdir"
														label="URL Imagen"
													></v-text-field>
												</v-col>
											</v-row>
										</v-container>
									</v-card-text>

									<v-card-actions>
										<v-spacer></v-spacer>
										<v-btn color="blue darken-1" text @click="close">
											Cancel
										</v-btn>
										<v-btn color="blue darken-1" text @click="save">
											Save
										</v-btn>
									</v-card-actions>
								</v-card>
							</v-dialog>
							<br />
							<v-btn class="ma-2" color="#002F6C" dark>
								Gestion Usuarios
							</v-btn>
							<br /><br /><br />
							<v-divider></v-divider><br />
						</div>

						<br />
					</v-col>
				</v-row>
				<v-footer padless fixed>
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
			</v-app>
		</v-container>
	</div>
</template>

<script>
	import firebase from "firebase";
	import axios from "axios";
	import NabBarUser from "@/components/Nav_BarUser.vue";

	export default {
		name: "Home",
		components: {
			//MenuUser,
			NabBarUser,
		},
		data() {
			return {
				//apps: [],
				dialog: false,
				editedIndex: -1,
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
				this.editedIndex = this.desserts.indexOf(item);
				this.editedItem = Object.assign({}, item);
				this.dialog = true;
			},

			deleteItem(item) {
				this.editedIndex = this.desserts.indexOf(item);
				this.editedItem = Object.assign({}, item);
				this.dialogDelete = true;
			},

			deleteItemConfirm() {
				this.desserts.splice(this.editedIndex, 1);
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
					Object.assign(this.desserts[this.editedIndex], this.editedItem);
				} else {
					this.apps.push(this.editedItem);
				}
				this.close();
			},
		},
	};
</script>

<style lang="scss" scoped>
	.rounded {
		border-radius: 50%;
	}

	.topspace {
		margin-top: 2rem;
		margin-bottom: -15px;
	}

	.capitalizar {
		text-transform: capitalize;
	}

	.size {
		height: 25px;
		width: 25px;
	}

	.overflow-y {
		overflow-y: auto;
	}
</style>
