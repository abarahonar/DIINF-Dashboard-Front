<template>
	<div class="login">
		<NabBar />
		<div id="general"></div>
		<div v-show="!cargando">
			<v-progress-circular indeterminate></v-progress-circular>
		</div>
		<v-container class="grey lighten-6" v-show="cargando">
			<v-row no-gutters>
				<v-col cols="4">
					<h1>Aplicaciones DIINF</h1>
					<br />
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
					<div id="textblock">
						<v-card color="#b6a9a8">
							<div class="right">
								<v-btn elevation="0" @click="btn_Avisos" color="#b6a9a8" dark>
									{{ btnAvisos }}
								</v-btn>
							</div>
						</v-card>
						<div v-show="v0">
							<v-banner
								v-for="a in primer_aviso"
								:key="a.name"
								two-line
								v-model="v0"
								transition="slide-y-transition"
							>
								<v-avatar slot="icon" color="deep-purple accent-4" size="40">
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
									11 de Enero de 2021
								</div>
							</v-banner>
							<div class="right">
								<v-btn
									elevation="0"
									v-show="!v1"
									@click="v1 = !v1"
									color="#b6a9a8"
									dark
								>
									Ver más
								</v-btn>
							</div>
							<v-banner
								v-for="a in avisos"
								:key="a.name"
								two-line
								v-model="v1"
								transition="slide-y-transition"
							>
								<v-avatar slot="icon" color="deep-purple accent-4" size="40">
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
									11 de Enero de 2021
								</div>
							</v-banner>
							<div class="right">
								<v-btn
									elevation="0"
									v-show="v1"
									@click="v1 = !v1"
									color="#b6a9a8"
									dark
								>
									Ocultar
								</v-btn>
							</div>
						</div>
					</div>

					<div id="textblock" v-if="!v0">
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the industry's standard dummy text
						ever since the 1500s, when an unknown printer took a galley of type
						and scrambled it to make a type specimen book. It has survived not
						only five centuries, but also the leap into electronic typesetting,
						remaining essentially unchanged.
						<br />
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the industry's standard dummy text
						ever since the 1500s, when an unknown printer took a galley of type
						and scrambled
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
	import NabBar from "@/components/Nav_BarUser.vue";

	export default {
		name: "login",

		components: {
			NabBar,
		},
		data: () => ({
			btn: true,
			btnAvisos: "Ocultar Avisos",
			v0: true,
			v1: false,
			cargando: false,
			avisos: [
				/*{
					title: "Aviso 1",
					text: "Aqui va aviso 2. ",
					color: "blue lighten-2",
				},
				{
					title: "Aviso 2",
					text: "Aqui va aviso 3. ",
					color: "blue lighten-3",
				},
				{
					title: "Aviso 3",
					text: "Aqui va aviso 2. ",
					color: "blue lighten-2",
				},
				{
					title: "Aviso 4",
					text: "Aqui va aviso 3. ",
					color: "blue lighten-3",
				},*/
			],
			primer_aviso: [],
		}),
		methods: {
			login: function() {
				window.location.href =
					"https://auth.catteam.tk?origin=https://dashboard.catteam.tk";
			},
			btn_Avisos() {
				this.v0 = !this.v0;
				this.v1 = false;
				this.btn = !this.btn;
				if (this.btn == true) {
					this.btnAvisos = "Ocultar Avisos";
				} else {
					this.btnAvisos = "Mostrar Avisos";
				}
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
				//Funcion para separar el ultimo aviso de la lista de los demás avisos
				//Si funciona incorrectamente, cambiar pop por shift()
				this.primer_aviso.push(this.avisos.pop());
			}
		},*/
		async beforeCreate() {
			const queryString = window.location.search;
			const urlParams = new URLSearchParams(queryString);
			const logIn = urlParams.get("loggedIn");
			console.log(logIn);
			//Redireccionar a la vista de aplicaciones si es true
			//En caso de que sea null puede que el usuario ya este registrado y sea necesario...
			let res = await fetch("https://back.catteam.tk/verify", {
				method: "get",
				credentials: "include",
			});
			if (res.ok) {
				console.log(res.status);
			}
			if (res.status == 200) {
				this.$router.push("/");
				this.cargando = false;
			} else {
				this.cargando = true;
			}
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
	h3 {
		padding: 6px;
		margin-top: 6px;
		text-align: left;
		margin-bottom: 6px;
		color: #4d4949;
	}
	#textblock {
		padding: 15px;
		text-align: justify;
	}
	.padding {
		padding: 15px;
	}
	#create .v-speed-dial {
		position: absolute;
	}
	.right-buttons {
		text-align: right;
		padding: 5px;
	}
	.right {
		text-align: right;
		padding: 2px;
	}
	.justify-text {
		margin-left: 10px;
		margin-right: 10px;

		text-align: justify;
	}
</style>
