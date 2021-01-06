<template>
	<div class="login">
		<NabBar />
		<div id="general"></div>

		<v-container class="grey lighten-6">
			<v-row no-gutters>
				<v-col cols="4">
					<h1>Aplicaciones DIINF</h1>

					<v-card class="pa-2" tile outlined height="300px">
						<br />

						<div id="general">
							Para poder ver tus aplicaciones, debes iniciar sesión.
							<br /><br /><br /><br /><br />
							<br />
							<v-btn rounded color="#002F6C" dark @click="login">
								Iniciar sesión
							</v-btn>
							<br /><br />
						</div>
					</v-card>
				</v-col>
				<v-col cols="8">
					<v-card>
						<v-card color="#ff153c" flat><h2>Ejemplo de aviso</h2></v-card>
						<div class="justify-text">
							Mensaje...
						</div>
					</v-card>
					<div id="textblock">
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the industry's standard dummy text
						ever since the 1500s, when an unknown printer took a galley of type
						and scrambled it to make a type specimen book. It has survived not
						only five centuries, but also the leap into electronic typesetting,
						remaining essentially unchanged. It was popularised in the 1960s
						with the release of Letraset sheets containing Lorem Ipsum passages,
						and more recently with desktop publishing software like Aldus
						PageMaker including versions of Lorem Ipsum.
						<br />
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the industry's standard dummy text
						ever since the 1500s, when an unknown printer took a galley of type
						and scrambled it to make a type specimen book. It has survived not
						only five centuries, but also the leap into electronic typesetting,
						remaining essentially unchanged. It was popularised in the 1960s
						with the release of Letraset sheets containing Lorem Ipsum passages,
						and more recently with desktop publishing software like Aldus
						PageMaker including versions of Lorem Ipsum.
						<br />
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
		</v-container>
	</div>
</template>

<script>
	import firebase from "firebase";
	import NabBar from "@/components/Nav_BarUser.vue";

	export default {
		name: "login",
		components: {
			NabBar,
		},
		data() {
			return {};
		},
		methods: {
			login: function() {
				const provider = new firebase.auth.GoogleAuthProvider();

				firebase
					.auth()
					.signInWithPopup(provider)
					.then(result => {
						this.$router.replace("/landing");
						console.log(result);
					})
					.catch(err => {
						alert("Oops. " + err.message);
					});
			},
		},
	};
</script>

<style scoped>
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
	#textblock {
		padding: 15px;
		text-align: justify;
	}
	.padding {
		padding: 25px;
	}
</style>
