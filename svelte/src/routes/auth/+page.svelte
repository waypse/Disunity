<script>
	import Login from './components/Login.svelte';
	import Register from './components/Register.svelte';

	let register = false;
</script>

{#if register}
	<Register bind:register />
{:else}
	<Login bind:register />
{/if}
