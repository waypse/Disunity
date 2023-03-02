<script>
	import { enhance } from '$app/forms';
	import { backOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	export let register;
</script>

<form
	method="POST"
	action="?/login"
	transition:fly={{ duration: 250, y: -50, easing: backOut }}
	use:enhance
>
	<input type="text" name="identifier" placeholder="Username or email" />
	<input type="password" name="password" placeholder="Password" />
	<button formaction="?/login">login</button>
	<button on:click|stopPropagation={() => (register = true)}>register</button>
</form>
