<!-- Based on shadcn-svelte Alert component: https://www.shadcn-svelte.com/docs/components/alert -->
<script lang="ts">
	import { cn } from '$lib/utils';

	let className: string = '';
	export { className as class };
</script>

<div class={cn('text-sm [&_p]:leading-relaxed', className)} {...$$restProps}>
	<slot />
</div>
