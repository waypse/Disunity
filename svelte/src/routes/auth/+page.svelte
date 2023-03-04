<script>
	import { goto } from '$app/navigation';
	import { backOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	let isRegister = false;

	let formData = {
		username: '',
		password: '',
		email: '',
	};
	let identifier = '';
	let password = '';

	const registerUser = async (_) => {
		const response = await window.electronApi.auth('register', formData);
		if (response.error) {
			console.log(response.error);
		} else {
			await goto('/');
		}
	};

	const login = async (_) => {
		const response = await window.electronApi.auth('login', { identifier, password });
		if (response.error) {
			console.log(response.error);
		} else {
			await goto('/');
		}
	};
</script>

{#if isRegister}
	<div
		class="register"
		in:fly|local={{ duration: 250, y: -50, easing: backOut }}
		out:fly|local={{ duration: 250, y: -50, easing: backOut }}
	>
		<h1>register</h1>
		<input type="text" name="username" placeholder="Username" bind:value={formData.username} />
		<input
			type="password"
			name="password"
			placeholder="Password"
			bind:value={formData.password}
		/>
		<input type="text" name="email" placeholder="Email" bind:value={formData.email} />
		<button on:click={registerUser}>register</button>
		<button on:click={() => (isRegister = false)}>login</button>
	</div>
{:else}
	<div
		class="login"
		in:fly|local={{ duration: 250, y: -50, easing: backOut }}
		out:fly|local={{ duration: 250, y: -50, easing: backOut }}
	>
		<h1>login</h1>
		<input
			type="text"
			name="identifier"
			placeholder="Username or email"
			bind:value={identifier}
		/>
		<input type="password" name="password" placeholder="Password" bind:value={password} />
		<button on:click={login}>login</button>
		<button on:click|stopPropagation={() => (isRegister = true)}>register</button>
	</div>
{/if}

<style>
	div {
		background-color: rgb(29, 29, 29);
		z-index: 99;
		grid-column: 1/2;
		grid-row: 1/2;
	}

	.register {
		height: 200px;
		width: 200px;
	}

	.login {
		height: 200px;
		width: 200px;
	}
</style>
