<template>
	<div class="LandingAdmin">
		<NabBarUser v-bind:photoURL="photoURL" v-bind:displayName="displayName" />
		<v-container class="grey lighten-6">
			<v-app id="aaa" height="1px" width="1px">
				<v-row no-gutters>
					<v-col cols="12" sm="6" md="8">
						<br /><br />
						<h1>Mis aplicaciones</h1>

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

											{{ a.name }}
											<br />

											<v-btn
												color="#EA7600"
												fab
												x-small
												dark
												@click="goto(a.url)"
											>
												<v-icon>mdi-note</v-icon>
											</v-btn>

											<br /><br />
										</v-card>
									</v-col>
								</v-row>
							</v-card-text>
						</v-card>
					</v-col>
					<v-col cols="6" md="4">
						<br /><br /><br />

						<v-divider></v-divider><br />

						<div class="textblock">
							Lorem Ipsum is simply dummy text of the printingase of Letraset
							sheets containing Lorem Ipsum passages, and more recently with
							desktop publishing software like Aldus PageMaker including
							versionsf the printing and of Lorem Ipsum.
							<br />
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry. Lorem Ipsum has been the industry's standard dummy text
							ever since the 1500s, when an unknown printer took a galley of
							type and scrambled it to make a type specimen book. It has
							survived not only five centuries, but also the leap into
							electronic typesetting, remaining essentially unchanged. It was
							popularised in the 1960s with the release of Letraset sheets con
							and more recently with desktop publishing software like Aldus
							PageMaker including versions of Lorem Ipsum.
							<br /><br />
							<v-divider></v-divider>
						</div>
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
				info: null,
				flex: "3",
				photoURL: "",
				displayName: "",
				email: "",
				//apps: [],
				apps: [
					{
						name: "Aplicacion 1",
						logo: "UWU",
						direccion:
							"http://vaibs.com.mx/wp-content/uploads/2020/05/mail.png",
					},
					{
						name: "Aplicacion 2",
						logo: "UWU",
						direccion:
							"http://vaibs.com.mx/wp-content/uploads/2020/05/mail.png",
					},
					{
						name: "Aplicacion 3",
						logo: "UWU",
						direccion:
							"http://vaibs.com.mx/wp-content/uploads/2020/05/icone-youtube-branco-png-6.png",
					},
					{
						name: "Aplicacion 4",
						logo: "UWU",
						direccion:
							"http://vaibs.com.mx/wp-content/uploads/2020/05/mail.png",
					},
					{
						name: "Aplicacion 5",
						logo: "UWU",
						direccion:
							"http://vaibs.com.mx/wp-content/uploads/2020/05/mail.png",
					},
					{
						name: "Aplicacion 6",
						logo: "UWU",
						direccion:
							"http://vaibs.com.mx/wp-content/uploads/2020/05/mail.png",
					},
					{
						name: "Aplicacion 7",
						logo: "UWU",
						direccion:
							"http://vaibs.com.mx/wp-content/uploads/2020/05/mail.png",
					},
					{
						name: "Aplicacion 8",
						logo: "UWU",
						direccion:
							"http://vaibs.com.mx/wp-content/uploads/2020/05/mail.png",
					},
					{
						name: "Aplicacion 9",
						logo: "UWU",
						direccion:
							"http://vaibs.com.mx/wp-content/uploads/2020/05/mail.png",
					},
					{
						name: "Aplicacion 10",
						logo: "UWU",
						direccion:
							"http://vaibs.com.mx/wp-content/uploads/2020/05/mail.png",
					},
					{
						name: "Aplicacion 11",
						logo: "UWU",
						direccion:
							"http://vaibs.com.mx/wp-content/uploads/2020/05/mail.png",
					},
				],
			};
		},
		created() {
			const user = firebase.auth().currentUser;
			this.displayName = user.displayName;
			this.email = user.email;
			this.photoURL = user.photoURL;
		},

		mounted() {
			axios
				.get("http://localhost:80/user-apps")
				.then(response => (this.apps = response.data));
		},
		methods: {
			goto(item) {
				this.item = item;
				this.$router.replace(item);
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
