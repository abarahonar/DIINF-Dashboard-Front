<template>
	<div class="login">
		<NabBar0 />
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
								Iniciar sesión como estudiante
							</v-btn>
							<br /><br />

							<div id="right">
								<v-btn icon fab x-small router-link to="/adminLogin">
									<v-icon>mdi-wrench</v-icon>
								</v-btn>
							</div>
						</div>
					</v-card>
				</v-col>
				<v-col cols="8">
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
	import NabBar0 from "@/components/Nav_Bar.vue";

	export default {
		name: "login",
		components: {
			NabBar0,
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

<style scoped></style>
