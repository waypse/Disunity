<script lang="ts">
	import { goto } from '$app/navigation';
	import { backOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	let identifier = '';
	let password = '';
	let error = '';

	const login = async () => {
		const response = await window.electronApi.auth('login', {
			identifier,
			password,
		});
		if (response.error) {
			error = response.error;
		} else {
			await goto('/home', { replaceState: true });
		}
	};
</script>

<div
	class="login"
	in:fly|local={{ duration: 250, y: -50, easing: backOut, delay: 250 }}
	out:fly|local={{ duration: 250, y: -50, easing: backOut }}
>
	<div class="wrapper">
		<h1>Disunity</h1>
		<h2>Welcome back !</h2>
		<input
			type="text"
			name="identifier"
			placeholder="Username or email"
			bind:value={identifier}
		/>
		<input type="password" name="password" placeholder="Password" bind:value={password} />
		<button on:click={login}>SIGN IN</button>
		<p>
			Need an account ?
			<a href="/register">Sign up</a>
		</p>
		{#if error}
			<p style="color: var(--red)">{error}</p>
		{/if}
	</div>
</div>

<style>
	p {
		justify-self: flex-start;
		text-align: start;
		font-family: 'Poppins';
		font-weight: 300;
		color: var(--light);
	}
	button:hover {
		filter: brightness(0.8);
	}
	button {
		margin: 5px;
		height: 50px;
		box-sizing: border-box;
		padding: 10px 20px;
		border-radius: 10px;
		background-color: var(--blue);
		appearance: none;
		border: none;
		color: var(--white);
		width: 100%;
		transition: 0.1s ease;
	}
	input {
		margin: 5px;
		height: 50px;
		box-sizing: border-box;
		padding: 10px 20px;
		border-radius: 10px;
		background-color: #f5f5f5;
		appearance: none;
		border: none;
		width: 100%;
	}
	h2 {
		font-family: 'Poppins';
		color: var(--light);
	}
	h1 {
		margin: 10px;
		font-family: 'Chango';
		color: var(--light);
	}
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.login {
		box-sizing: border-box;
		background-color: var(--blue-gray);
		z-index: 99;
		grid-column: 1/2;
		grid-row: 1/2;
		width: 480px;
		padding: 32px;
		border-radius: 8px;
	}
</style>
