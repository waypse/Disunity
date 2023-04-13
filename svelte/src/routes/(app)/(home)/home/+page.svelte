<script lang="ts">
	import { goto } from '$app/navigation';
	import Logo from '$lib/components/Logo.svelte';

	const logout = async () => {
		await window.electronApi.auth('logout');
		await goto('/login', { replaceState: true });
	};
</script>

<button on:click={logout}>logout</button>

<style>
	button {
		margin-top: 20px;
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
