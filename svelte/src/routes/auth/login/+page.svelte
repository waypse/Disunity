<script lang="ts">
	import { goto } from '$app/navigation';
	import { backOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	let identifier = '';
	let password = '';

	const login = async () => {
		const response = await window.electronApi.auth('login', {
			identifier,
			password,
		});
		if (response.error) {
			console.log(response.error);
		} else {
			await goto('/app', { replaceState: true });
		}
	};
</script>

<div
	class="login"
	in:fly|local={{ duration: 250, y: -50, easing: backOut, delay: 250 }}
	out:fly|local={{ duration: 250, y: -50, easing: backOut }}
>
	<h1>login</h1>
	<input type="text" name="identifier" placeholder="Username or email" bind:value={identifier} />
	<input type="password" name="password" placeholder="Password" bind:value={password} />
	<button on:click={login}>login</button>
	<a href="/auth/register">register</a>
</div>

<style>
	.login {
		box-sizing: border-box;
		background-color: rgb(29, 29, 29);
		z-index: 99;
		grid-column: 1/2;
		grid-row: 1/2;
		height: 400px;
		width: 480px;
		padding: 32px;
	}
</style>
