<script lang="ts">
	import { Tabs as TabsPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	type $$Props = TabsPrimitive.RootProps;
	type $$Events = TabsPrimitive.RootEvents;

	let {
		class: className,
		value = $bindable(),
		onValueChange,
		disabled,
		loop,
		orientation,
		activationMode,
		children,
		...restProps
	}: $$Props = $props();
</script>

<TabsPrimitive.Root
	bind:value
	{onValueChange}
	{disabled}
	{loop}
	{orientation}
	{activationMode}
	class={cn("", className)}
	{...restProps}
>
	{@render children?.()}
</TabsPrimitive.Root>
