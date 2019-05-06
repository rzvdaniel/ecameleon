<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<div id='container'>
<h1>Apps list</h1>

<ul>
	<li><a href="#" on:click={loadApp}>App</a></li>
</ul>

<svelte:component this={App}/>

<p><strong>Try editing this file (routes/index.html) to test live reloading.</strong></p>
</div>


<style>
	h1, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<script>
	let App;

	async function loadApp() {
		const app = './Apps/App/main.js';
		({ default: App } = await import(app));
	}
</script>

