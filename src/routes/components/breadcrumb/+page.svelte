<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { themeStore, themes } from '$lib/stores/theme';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Button } from '$lib/components/ui/button';
	
	// Icon imports
	import HomeIcon from '@lucide/svelte/icons/home';
	import FolderIcon from '@lucide/svelte/icons/folder';
	import FileIcon from '@lucide/svelte/icons/file';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import SlashIcon from '@lucide/svelte/icons/slash';
	import CopyIcon from '@lucide/svelte/icons/copy';
	
	let currentTheme = 'default';
	let copied = false;
	
	// Subscribe to theme store
	$: currentTheme = $themeStore;
	
	// Get the registry base URL
	$: registryBaseUrl = typeof window !== 'undefined' ? window.location.origin + base : '';
	
	function switchTheme(themeId: string) {
		themeStore.setTheme(themeId);
	}
	
	// Load saved theme on mount
	onMount(() => {
		themeStore.loadTheme();
	});
	
	// Copy to clipboard functionality
	async function copyToClipboard(text: string) {
		try {
			await navigator.clipboard.writeText(text);
			copied = true;
			setTimeout(() => copied = false, 2000);
		} catch (err) {
			console.error('Failed to copy text: ', err);
		}
	}
	
	const installCommand = `npx shadcn-svelte@latest add ${registryBaseUrl}/r/breadcrumb.json`;
	const usageExample = `<script lang="ts">
  import * as Breadcrumb from "$lib/components/ui/breadcrumb";
<\/script>

<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/components">Components</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>`;
</script>

<svelte:head>
	<title>Breadcrumb Component - UI Registry</title>
	<meta name="description" content="Displays the path to the current resource using a hierarchy of links." />
</svelte:head>

<div class="min-h-screen bg-background">
	<!-- Header -->
	<header class="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
		<div class="container mx-auto px-4 py-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center space-x-4">
					<a href="{base}/" class="text-2xl font-bold text-foreground hover:text-primary transition-colors">
						UI Registry
					</a>
					<nav class="hidden md:flex space-x-6">
						<a href="{base}/" class="text-muted-foreground hover:text-foreground transition-colors">Home</a>
						<a href="{base}/components" class="text-muted-foreground hover:text-foreground transition-colors">Components</a>
						<a href="{base}/themes" class="text-muted-foreground hover:text-foreground transition-colors">Themes</a>
					</nav>
				</div>
				
				<!-- Theme Switcher -->
				<div class="flex items-center space-x-4">
					<div class="flex items-center space-x-2">
						<span class="text-sm text-muted-foreground">Theme:</span>
						<select 
							bind:value={currentTheme} 
							on:change={(e) => switchTheme(e.target.value)}
							class="px-3 py-1 text-sm border border-border rounded-md bg-background text-foreground"
						>
							{#each themes as theme}
								<option value={theme.id}>{theme.name}</option>
							{/each}
						</select>
					</div>
				</div>
			</div>
		</div>
	</header>

	<!-- Breadcrumb -->
	<div class="container mx-auto px-4 py-4">
		<nav class="flex items-center space-x-2 text-sm text-muted-foreground">
			<a href="{base}/" class="hover:text-foreground transition-colors">Home</a>
			<span>/</span>
			<a href="{base}/components" class="hover:text-foreground transition-colors">Components</a>
			<span>/</span>
			<span class="text-foreground">Breadcrumb</span>
		</nav>
	</div>

	<!-- Hero Section -->
	<section class="py-12 px-4">
		<div class="container mx-auto">
			<div class="max-w-4xl mx-auto text-center">
				<div class="flex items-center justify-center space-x-2 mb-4">
					<h1 class="text-4xl md:text-5xl font-bold text-foreground">Breadcrumb</h1>
					<Badge variant="secondary">Component</Badge>
				</div>
				<p class="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
					Displays the path to the current resource using a hierarchy of links.
				</p>
			</div>
		</div>
	</section>

	<!-- Main Content with Tabs -->
	<section class="py-8 px-4">
		<div class="container mx-auto max-w-4xl">
			<Tabs.Root value="examples" class="w-full">
				<Tabs.List class="grid w-full grid-cols-3">
					<Tabs.Trigger value="examples">Examples</Tabs.Trigger>
					<Tabs.Trigger value="usage">Usage</Tabs.Trigger>
					<Tabs.Trigger value="api">API</Tabs.Trigger>
				</Tabs.List>
				
				<!-- Examples Tab -->
				<Tabs.Content value="examples" class="space-y-8">
					<!-- Basic Breadcrumb -->
					<Card>
						<CardHeader>
							<CardTitle>Basic Breadcrumb</CardTitle>
							<CardDescription>A simple breadcrumb navigation showing the current page path</CardDescription>
						</CardHeader>
						<CardContent>
							<div class="space-y-4">
								<Breadcrumb.Root>
									<Breadcrumb.List>
										<Breadcrumb.Item>
											<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
										</Breadcrumb.Item>
										<Breadcrumb.Separator />
										<Breadcrumb.Item>
											<Breadcrumb.Link href="/components">Components</Breadcrumb.Link>
										</Breadcrumb.Item>
										<Breadcrumb.Separator />
										<Breadcrumb.Item>
											<Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
										</Breadcrumb.Item>
									</Breadcrumb.List>
								</Breadcrumb.Root>
								
								<pre class="bg-muted p-2 rounded text-xs overflow-x-auto"><code>&lt;Breadcrumb.Root&gt;
  &lt;Breadcrumb.List&gt;
    &lt;Breadcrumb.Item&gt;
      &lt;Breadcrumb.Link href="/"&gt;Home&lt;/Breadcrumb.Link&gt;
    &lt;/Breadcrumb.Item&gt;
    &lt;Breadcrumb.Separator /&gt;
    &lt;Breadcrumb.Item&gt;
      &lt;Breadcrumb.Link href="/components"&gt;Components&lt;/Breadcrumb.Link&gt;
    &lt;/Breadcrumb.Item&gt;
    &lt;Breadcrumb.Separator /&gt;
    &lt;Breadcrumb.Item&gt;
      &lt;Breadcrumb.Page&gt;Breadcrumb&lt;/Breadcrumb.Page&gt;
    &lt;/Breadcrumb.Item&gt;
  &lt;/Breadcrumb.List&gt;
&lt;/Breadcrumb.Root&gt;</code></pre>
							</div>
						</CardContent>
					</Card>

					<!-- Breadcrumb with Icons -->
					<Card>
						<CardHeader>
							<CardTitle>Breadcrumb with Icons</CardTitle>
							<CardDescription>Enhanced breadcrumb navigation with icons for better visual hierarchy</CardDescription>
						</CardHeader>
						<CardContent>
							<div class="space-y-4">
								<Breadcrumb.Root>
									<Breadcrumb.List>
										<Breadcrumb.Item>
											<Breadcrumb.Link href="/" class="flex items-center gap-2">
												<HomeIcon class="h-4 w-4" />
												Home
											</Breadcrumb.Link>
										</Breadcrumb.Item>
										<Breadcrumb.Separator />
										<Breadcrumb.Item>
											<Breadcrumb.Link href="/docs" class="flex items-center gap-2">
												<FolderIcon class="h-4 w-4" />
												Documentation
											</Breadcrumb.Link>
										</Breadcrumb.Item>
										<Breadcrumb.Separator />
										<Breadcrumb.Item>
											<Breadcrumb.Page class="flex items-center gap-2">
												<FileIcon class="h-4 w-4" />
												Components
											</Breadcrumb.Page>
										</Breadcrumb.Item>
									</Breadcrumb.List>
								</Breadcrumb.Root>
								
								<pre class="bg-muted p-2 rounded text-xs overflow-x-auto"><code>&lt;Breadcrumb.Root&gt;
  &lt;Breadcrumb.List&gt;
    &lt;Breadcrumb.Item&gt;
      &lt;Breadcrumb.Link href="/" class="flex items-center gap-2"&gt;
        &lt;HomeIcon class="h-4 w-4" /&gt;
        Home
      &lt;/Breadcrumb.Link&gt;
    &lt;/Breadcrumb.Item&gt;
    &lt;Breadcrumb.Separator /&gt;
    &lt;Breadcrumb.Item&gt;
      &lt;Breadcrumb.Page class="flex items-center gap-2"&gt;
        &lt;FileIcon class="h-4 w-4" /&gt;
        Components
      &lt;/Breadcrumb.Page&gt;
    &lt;/Breadcrumb.Item&gt;
  &lt;/Breadcrumb.List&gt;
&lt;/Breadcrumb.Root&gt;</code></pre>
							</div>
						</CardContent>
					</Card>

					<!-- Custom Separators -->
					<Card>
						<CardHeader>
							<CardTitle>Custom Separators</CardTitle>
							<CardDescription>Breadcrumb with custom separator icons</CardDescription>
						</CardHeader>
						<CardContent>
							<div class="space-y-4">
								<Breadcrumb.Root>
									<Breadcrumb.List>
										<Breadcrumb.Item>
											<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
										</Breadcrumb.Item>
										<Breadcrumb.Separator>
											<SlashIcon class="h-4 w-4" />
										</Breadcrumb.Separator>
										<Breadcrumb.Item>
											<Breadcrumb.Link href="/products">Products</Breadcrumb.Link>
										</Breadcrumb.Item>
										<Breadcrumb.Separator>
											<SlashIcon class="h-4 w-4" />
										</Breadcrumb.Separator>
										<Breadcrumb.Item>
											<Breadcrumb.Page>Laptop</Breadcrumb.Page>
										</Breadcrumb.Item>
									</Breadcrumb.List>
								</Breadcrumb.Root>
								
								<pre class="bg-muted p-2 rounded text-xs overflow-x-auto"><code>&lt;Breadcrumb.Root&gt;
  &lt;Breadcrumb.List&gt;
    &lt;Breadcrumb.Item&gt;
      &lt;Breadcrumb.Link href="/"&gt;Home&lt;/Breadcrumb.Link&gt;
    &lt;/Breadcrumb.Item&gt;
    &lt;Breadcrumb.Separator&gt;
      &lt;SlashIcon class="h-4 w-4" /&gt;
    &lt;/Breadcrumb.Separator&gt;
    &lt;Breadcrumb.Item&gt;
      &lt;Breadcrumb.Page&gt;Laptop&lt;/Breadcrumb.Page&gt;
    &lt;/Breadcrumb.Item&gt;
  &lt;/Breadcrumb.List&gt;
&lt;/Breadcrumb.Root&gt;</code></pre>
							</div>
						</CardContent>
					</Card>
				</Tabs.Content>

				<!-- Usage Tab -->
				<Tabs.Content value="usage" class="space-y-8">
					<!-- Installation -->
					<Card>
						<CardHeader>
							<CardTitle>Installation</CardTitle>
							<CardDescription>Add the Breadcrumb component to your project</CardDescription>
						</CardHeader>
						<CardContent>
							<div class="relative">
								<pre class="bg-muted p-4 rounded-md border text-sm overflow-x-auto"><code>{installCommand}</code></pre>
								<Button 
									size="icon" 
									variant="outline" 
									class="absolute top-2 right-2"
									on:click={() => copyToClipboard(installCommand)}
									aria-label="Copy installation command"
								>
									{#if copied}
										<span class="text-green-500">✓</span>
									{:else}
										<CopyIcon class="h-4 w-4" />
									{/if}
								</Button>
							</div>
						</CardContent>
					</Card>

					<!-- Basic Usage -->
					<Card>
						<CardHeader>
							<CardTitle>Basic Usage</CardTitle>
							<CardDescription>Import and use the Breadcrumb component</CardDescription>
						</CardHeader>
						<CardContent>
							<div class="relative">
								<pre class="bg-muted p-4 rounded-md border text-sm overflow-x-auto"><code>{usageExample}</code></pre>
								<Button 
									size="icon" 
									variant="outline" 
									class="absolute top-2 right-2"
									on:click={() => copyToClipboard(usageExample)}
									aria-label="Copy usage example"
								>
									{#if copied}
										<span class="text-green-500">✓</span>
									{:else}
										<CopyIcon class="h-4 w-4" />
									{/if}
								</Button>
							</div>
						</CardContent>
					</Card>
				</Tabs.Content>

				<!-- API Tab -->
				<Tabs.Content value="api" class="space-y-8">
					<Card>
						<CardHeader>
							<CardTitle>API Reference</CardTitle>
							<CardDescription>Available components and their properties</CardDescription>
						</CardHeader>
						<CardContent>
							<div class="space-y-6">
								<!-- Breadcrumb.Root -->
								<div>
									<h4 class="text-lg font-semibold mb-3">Breadcrumb.Root</h4>
									<p class="text-sm text-muted-foreground mb-3">The root container for the breadcrumb navigation.</p>
									<div class="overflow-x-auto">
										<table class="w-full text-sm">
											<thead>
												<tr class="border-b">
													<th class="text-left p-2 font-medium">Prop</th>
													<th class="text-left p-2 font-medium">Type</th>
													<th class="text-left p-2 font-medium">Default</th>
													<th class="text-left p-2 font-medium">Description</th>
												</tr>
											</thead>
											<tbody class="text-muted-foreground">
												<tr class="border-b">
													<td class="p-2 font-mono">class</td>
													<td class="p-2">string</td>
													<td class="p-2">""</td>
													<td class="p-2">Additional CSS classes</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>

								<!-- Breadcrumb.List -->
								<div>
									<h4 class="text-lg font-semibold mb-3">Breadcrumb.List</h4>
									<p class="text-sm text-muted-foreground mb-3">Contains the breadcrumb items in an ordered list.</p>
									<div class="overflow-x-auto">
										<table class="w-full text-sm">
											<thead>
												<tr class="border-b">
													<th class="text-left p-2 font-medium">Prop</th>
													<th class="text-left p-2 font-medium">Type</th>
													<th class="text-left p-2 font-medium">Default</th>
													<th class="text-left p-2 font-medium">Description</th>
												</tr>
											</thead>
											<tbody class="text-muted-foreground">
												<tr class="border-b">
													<td class="p-2 font-mono">class</td>
													<td class="p-2">string</td>
													<td class="p-2">""</td>
													<td class="p-2">Additional CSS classes</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>

								<!-- Breadcrumb.Item -->
								<div>
									<h4 class="text-lg font-semibold mb-3">Breadcrumb.Item</h4>
									<p class="text-sm text-muted-foreground mb-3">Individual breadcrumb item container.</p>
									<div class="overflow-x-auto">
										<table class="w-full text-sm">
											<thead>
												<tr class="border-b">
													<th class="text-left p-2 font-medium">Prop</th>
													<th class="text-left p-2 font-medium">Type</th>
													<th class="text-left p-2 font-medium">Default</th>
													<th class="text-left p-2 font-medium">Description</th>
												</tr>
											</thead>
											<tbody class="text-muted-foreground">
												<tr class="border-b">
													<td class="p-2 font-mono">class</td>
													<td class="p-2">string</td>
													<td class="p-2">""</td>
													<td class="p-2">Additional CSS classes</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>

								<!-- Breadcrumb.Link -->
								<div>
									<h4 class="text-lg font-semibold mb-3">Breadcrumb.Link</h4>
									<p class="text-sm text-muted-foreground mb-3">Clickable breadcrumb link.</p>
									<div class="overflow-x-auto">
										<table class="w-full text-sm">
											<thead>
												<tr class="border-b">
													<th class="text-left p-2 font-medium">Prop</th>
													<th class="text-left p-2 font-medium">Type</th>
													<th class="text-left p-2 font-medium">Default</th>
													<th class="text-left p-2 font-medium">Description</th>
												</tr>
											</thead>
											<tbody class="text-muted-foreground">
												<tr class="border-b">
													<td class="p-2 font-mono">href</td>
													<td class="p-2">string</td>
													<td class="p-2">required</td>
													<td class="p-2">URL to navigate to</td>
												</tr>
												<tr class="border-b">
													<td class="p-2 font-mono">class</td>
													<td class="p-2">string</td>
													<td class="p-2">""</td>
													<td class="p-2">Additional CSS classes</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>

								<!-- Breadcrumb.Page -->
								<div>
									<h4 class="text-lg font-semibold mb-3">Breadcrumb.Page</h4>
									<p class="text-sm text-muted-foreground mb-3">Current page indicator (non-clickable).</p>
									<div class="overflow-x-auto">
										<table class="w-full text-sm">
											<thead>
												<tr class="border-b">
													<th class="text-left p-2 font-medium">Prop</th>
													<th class="text-left p-2 font-medium">Type</th>
													<th class="text-left p-2 font-medium">Default</th>
													<th class="text-left p-2 font-medium">Description</th>
												</tr>
											</thead>
											<tbody class="text-muted-foreground">
												<tr class="border-b">
													<td class="p-2 font-mono">class</td>
													<td class="p-2">string</td>
													<td class="p-2">""</td>
													<td class="p-2">Additional CSS classes</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>

								<!-- Breadcrumb.Separator -->
								<div>
									<h4 class="text-lg font-semibold mb-3">Breadcrumb.Separator</h4>
									<p class="text-sm text-muted-foreground mb-3">Visual separator between breadcrumb items.</p>
									<div class="overflow-x-auto">
										<table class="w-full text-sm">
											<thead>
												<tr class="border-b">
													<th class="text-left p-2 font-medium">Prop</th>
													<th class="text-left p-2 font-medium">Type</th>
													<th class="text-left p-2 font-medium">Default</th>
													<th class="text-left p-2 font-medium">Description</th>
												</tr>
											</thead>
											<tbody class="text-muted-foreground">
												<tr class="border-b">
													<td class="p-2 font-mono">class</td>
													<td class="p-2">string</td>
													<td class="p-2">""</td>
													<td class="p-2">Additional CSS classes</td>
												</tr>
												<tr>
													<td class="p-2 font-mono">children</td>
													<td class="p-2">any</td>
													<td class="p-2">ChevronRightIcon</td>
													<td class="p-2">Custom separator content</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</Tabs.Content>
			</Tabs.Root>
		</div>
	</section>

	<!-- Footer -->
	<footer class="border-t border-border py-8 px-4">
		<div class="container mx-auto text-center">
			<p class="text-muted-foreground">
				Built with ❤️ using SvelteKit and shadcn-svelte
			</p>
		</div>
	</footer>
</div>
