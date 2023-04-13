<script lang="ts">
	import { goto } from '$app/navigation';
	import StatusBar from '$lib/components/layout/StatusBar.svelte';
	import { bearerToken } from '$lib/stores/global.store';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	let ready = false;

	async function load(data: LayoutData): Promise<void> {
		if (data.access_token) {
			bearerToken.set(data.access_token);
			await goto('/home');
		} else {
			await goto('/login');
		}
	}

	onMount(async () => {
		await load(data);
		ready = true;
	});
</script>

<StatusBar>
	{#if ready}
		<slot />
	{/if}
</StatusBar>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Chango&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
	:root {
		font-family: 'Poppins', 'Chango', sans-serif;
		box-sizing: border-box;
		padding: 0;
		margin: 0;
		--black: #101010;
		--light-black: #151619;
		--blue-gray: #353740;
		--light: #e8d9df;
		--gray: #f1f1f1;
		--white: #ffffff;
		--red: #ff6d6d;
		--light-green: #acdacc;
		--orange: #ffa26b;
		--yellow: #efca6b;
		--blue: #5388f6;
		--light-blue: #afc6ff;
		--green: #69b4a6;
		--light-blue-gray: #eff4fc;
	}
	:global(body) {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}
	:global(.btn) {
		-webkit-app-region: no-drag;
		appearance: none;
		border: 0;
		cursor: pointer;
	}
</style>
