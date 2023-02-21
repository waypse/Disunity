<script>
	import { onMount } from 'svelte';
	import { statusbar } from '$lib/stores/global.store';

	let form;

	onMount(() => {
		$statusbar.isTransparent = true;
	});
</script>
