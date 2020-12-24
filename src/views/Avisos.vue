<template>
	<div class="LandingAdmin">
		<NabBarUser v-bind:photoURL="photoURL" v-bind:displayName="displayName" />
		<v-container class="grey lighten-6">
			<v-app id="generalPage">
				<v-row no-gutters>
					<v-col cols="12" sm="6" md="8">
						<br /><br />
						<h1>Avisos</h1>

						<v-card
							v-scroll.self
							class="overflow-y"
							outlined
							tile
							height="428px"
							max-width="760px"
						>
							<v-card-text>
								<v-col v-for="a in avisos" :key="a.name" :cols="12">
									<v-alert
										border="bottom"
										colored-border
										type="warning"
										elevation="1"
									>
										<h1>{{ a.title }}</h1>
										{{ a.text }}
									</v-alert>
								</v-col>
							</v-card-text>
						</v-card>
					</v-col>
					<v-col cols="6" md="4">
						<br /><br /><br /><br />

						<v-divider></v-divider><br />

						<div class="textblock">
							<v-text-field
								v-model="name"
								:counter="10"
								:rules="nameRules"
								label="Titulo"
								required
							></v-text-field>

							<v-textarea autocomplete="email" label="Mensaje"></v-textarea>

							<br />

							<v-overflow-btn
								class="my-2"
								:items="items"
								label="Tipo de aviso"
								dense
							></v-overflow-btn>
							<br /><br />

							<v-btn class="ma-2" color="#002F6C" dark>
								Subir Alerta
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
				flex: "3",
				photoURL: "",
				displayName: "",
				email: "",
				items: ["Aviso", "Error", "Informacion"],
				avisos: [
					{
						title: "Aviso 1",
						text:
							"Aqui va aviso 1. Lorem Ipsum is simply dummy Lorem Ipsum is simply dummy Lorem Ipsum is simply dummy Lorem Ipsum is simply dummy Lorem Ipsum is simply dummy Lorem Ipsum is simply dummy ",
						color: "00000",
						tipe: "miau",
					},
					{
						title: "Aviso 2",
						text:
							"Aqui va aviso 2. Lorem Ipsum is simply dummy Lorem Ipsum is simply dummy Lorem Ipsum is simply dummy Lorem Ipsum is simply dummy Lorem Ipsum is simply dummy Lorem Ipsum is simply dummy Lorem Ipsum is simply dummy ",
						color: "00000",
						tipe: "miau",
					},
					{
						title: "Aviso 3",
						text:
							"Aqui va aviso 3. Lorem Ipsum is simply dummy Lorem Ipsum is simply dummy ",
						color: "00000",
						tipe: "miau",
					},
				],
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
		created() {
			const user = firebase.auth().currentUser;
			this.displayName = user.displayName;
			this.email = user.email;
			this.photoURL = user.photoURL;
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
