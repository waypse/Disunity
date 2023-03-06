<script lang="ts">
	import { goto } from '$app/navigation';
	import Logo from '$lib/components/Logo.svelte';

	const logout = async () => {
		await window.electronApi.auth('logout');
		await goto('/auth/login', { replaceState: true });
	};
</script>

<main>
	<Logo />
</main>

<button on:click={logout}>logout</button>

<style>
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
