import App from './App.svelte';

const app = new App({
	target: document.body,// document.querySelector('#AppHost'),
	props: {
		name: 'world'
	}
});

export default app;