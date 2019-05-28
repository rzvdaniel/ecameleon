<svelte:head>
	<title>Logout</title>
</svelte:head>

<script context="module">
    export async function preload(page, session) {
		await logout();
    }
</script>

<script>
	import { auth } from '../library/stores.js';
	import { goto } from '@sapper/app';

	async function logout() {	
		await auth.logout();
		goto('/login');
	}
</script>