<template>
	<div class="nabUser">
		<v-toolbar color="#EA7600" dark>
			<img src="https://i.imgur.com/CJ35MHn.png" width="105" height="50" />
			<v-toolbar-title> SSO Diinf</v-toolbar-title>
			<v-spacer></v-spacer>

			<v-menu offset-y>
				<template v-slot:activator="{ on, attrs }">
					<v-btn
						depressed
						color="#EA7600"
						dark
						v-bind="attrs"
						v-on="on"
						@click="login2"
					>
						<img alt="profilePic" :src="photoURL" class="rounded size" />

						&nbsp;

						{{ displayName }}
					</v-btn>
				</template>
				<v-list>
					<v-list-item v-for="(item, index) in items" :key="index">
						<v-btn depressed block router-link to="/">
							{{ item.title }}
						</v-btn>
					</v-list-item>
				</v-list>
			</v-menu>
		</v-toolbar>
	</div>
</template>

<script>
	export default {
		name: "NabBarUser",
		props: {
			photoURL: String,
			displayName: String,
		},
		data: () => ({
			items: [
				{ title: "Inicio", path: "" },
				{ title: "Información personal", path: "" },
				{ title: "Cerrar sesión", path: "" },
			],
		}),
	};
</script>

<style lang="scss" scoped>
	.rounded {
		border-radius: 50%;
		margin-right: 10px;
	}

	.size {
		height: 25px;
		width: 25px;
	}
</style>
