<svelte:head>
  <title>Sign in</title>
	<link rel="stylesheet" href="{root}/bundle.css">
</svelte:head>

<h1>Sign In</h1>
<p><a href="/register">Need an account?</a></p>
<p><a href="/reset">Forgotten?</a></p>

<!-- <Error {error} />

<form on:submit|preventDefault='{submit}'>
    <input type="email" placeholder="Email" bind:value={username}>
    <input type="password" placeholder="Password" bind:value={password}>
    <button type="submit" disabled='{!username || !password}'>Sign in</button>
</form> -->

<script context="module">
	export async function preload({ params: { app } }) {
		console.log(`loading app bundle '${app}.js'`)
		return { app };
	}
</script>

<script>

	import { goto, stores } from '@sapper/app';
	// import { api } from './library/api.js';
	// import Error from './Error.svelte';

	export let root;

	// const { session } = stores();

	// let username = '';
	// let password = '';
	// let error = false;

	// async function submit(event) {

	// 		const credentials = {
	// 				email : username,
	// 				password : password
	// 		};

	// 		const user = await api.post('api/v1/login', credentials);

	// 		if (user.email === username) {
	// 				$session.user = user;
	// 				$session.token = user.token;
	// 				goto('/');
	// 		}
	// 		else {
	// 				error = response.message;
	// 		}
	// }
</script>