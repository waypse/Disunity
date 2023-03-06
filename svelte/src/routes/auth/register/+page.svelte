<script lang="ts">
	import { goto } from '$app/navigation';
	import { backOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	let formData = {
		username: '',
		password: '',
		email: '',
	};

	const registerUser = async () => {
		const response = await window.electronApi.auth('register', formData);
		if (response.error) {
			console.log(response.error);
		} else {
			await goto('/app', { replaceState: true });
		}
	};
</script>

<div
	class="register"
	in:fly|local={{ duration: 250, y: -50, easing: backOut, delay: 250 }}
	out:fly|local={{ duration: 250, y: -50, easing: backOut }}
>
	<h1>register</h1>
	<input type="text" name="username" placeholder="Username" bind:value={formData.username} />
	<input type="password" name="password" placeholder="Password" bind:value={formData.password} />
	<input type="text" name="email" placeholder="Email" bind:value={formData.email} />
	<button on:click={registerUser}>register</button>
	<a href="/auth/login">login</a>
</div>

<style>
	.register {
		background-color: rgb(29, 29, 29);
		z-index: 99;
		grid-column: 1/2;
		grid-row: 1/2;
		height: 600px;
		width: 480px;
	}
</style>
