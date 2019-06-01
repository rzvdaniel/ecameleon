<script context="module">
	import { goto } from '@sapper/app';

    export function preload(page, session) {

		const { user } = session;
		
		if (!user) {
			return this.redirect(302, 'login');
		}

		const { app } = page.params;
		return { app }
    }
</script>


<script>
	export let app

	let loading_component = new Promise(() => {})
	$: if (process.browser) {
		console.log(`loading app bundle '/${app}/bundle.mjs'`)
		loading_component = import(`/${app}/bundle.mjs`)
	}
	
	// onMount is only called when this route is initialized
	// if you click a link from an app to another,
	// this won't be triggered
	import { onMount } from 'svelte'
	onMount(() => console.log(`[app].svelte route was mounted`))
</script>

<h1>App "{app}"</h1>

{#await loading_component}
	<strong>Loading...</strong>
{:then module}
<!-- Don't forget to pass the app params like "root" -->
	<svelte:component this="{module.default}" root={app}/>
{:catch err}
	<strong>Ops! Something went wrong: {err}</strong>
{/await}

<p><a href="/apps">back to list</a></p>
