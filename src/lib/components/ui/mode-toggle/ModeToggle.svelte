<script lang="ts">
	import { mode, setMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';
	
	function toggleMode() {
		if (mode.current === 'light') {
			setMode('dark');
		} else {
			setMode('light');
		}
	}
</script>

<Button
	variant="outline"
	size="icon"
	on:click={toggleMode}
	aria-label="Toggle theme"
	class="relative"
>
	<Sun
		class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
	/>
	<Moon
		class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
	/>
	<span class="sr-only">Toggle theme</span>
</Button>
