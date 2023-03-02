<script>
	import Logo from '$lib/components/Logo.svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte/types/runtime/internal/lifecycle';
	import { statusbar } from '$lib/stores/global.store';

	let desktop;
	if (window.electron && browser) {
		window.electron.receive('from-main', (data) => {
			desktop = `Received Message "${data}" from Electron`;
			console.log(desktop);
		});
	}

	onMount(() => {
		$statusbar.isTransparent = false;
	});
</script>

<main>
	<Logo />
</main>

<style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}

	:global(body) {
		margin: 0;
		padding: 0;
	}

	main {
		padding: 2em 1em 1em 1em;
		text-align: center;
		animation: fade 1s;
		margin: 0 auto;
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
