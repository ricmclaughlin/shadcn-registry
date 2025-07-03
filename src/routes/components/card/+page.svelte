<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { themeStore, themes } from '$lib/stores/theme';
	import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	
	// Icon imports
	import StarIcon from '@lucide/svelte/icons/star';
	import HeartIcon from '@lucide/svelte/icons/heart';
	import ShareIcon from '@lucide/svelte/icons/share';
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
	
	const installCommand = `npx shadcn-svelte@latest add ${registryBaseUrl}/r/card.json`;
	const usageExample = `<script lang="ts">
  import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "$lib/components/ui/card";
<\/script>

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
</Card>`;
</script>

<svelte:head>
	<title>Card Component - UI Registry</title>
	<meta name="description" content="A flexible card container component with header, content, and footer sections." />
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
		<Breadcrumb.Root>
			<Breadcrumb.List>
				<Breadcrumb.Item>
					<Breadcrumb.Link href="{base}/">Home</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
				<Breadcrumb.Item>
					<Breadcrumb.Link href="{base}/components">Components</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
				<Breadcrumb.Item>
					<Breadcrumb.Page>Card</Breadcrumb.Page>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb.Root>
	</div>

	<!-- Hero Section -->
	<section class="py-12 px-4">
		<div class="container mx-auto">
			<div class="max-w-4xl mx-auto text-center">
				<div class="flex items-center justify-center space-x-2 mb-4">
					<h1 class="text-4xl md:text-5xl font-bold text-foreground">Card</h1>
					<Badge variant="secondary">Component</Badge>
				</div>
				<p class="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
					A flexible card container component with header, content, and footer sections.
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
					<!-- Basic Card -->
					<Card>
						<CardHeader>
							<CardTitle>Basic Card</CardTitle>
							<CardDescription>Simple card with header and content</CardDescription>
						</CardHeader>
						<CardContent>
							<div class="space-y-4">
								<Card class="w-full max-w-sm">
									<CardHeader>
										<CardTitle>Simple Card</CardTitle>
										<CardDescription>This is a basic card example</CardDescription>
									</CardHeader>
									<CardContent>
										<p class="text-sm text-muted-foreground">
											This is the card content. You can put any content here.
										</p>
									</CardContent>
								</Card>
								
								<pre class="bg-muted p-2 rounded text-xs overflow-x-auto"><code>&lt;Card&gt;
  &lt;CardHeader&gt;
    &lt;CardTitle&gt;Simple Card&lt;/CardTitle&gt;
    &lt;CardDescription&gt;This is a basic card example&lt;/CardDescription&gt;
  &lt;/CardHeader&gt;
  &lt;CardContent&gt;
    &lt;p&gt;This is the card content.&lt;/p&gt;
  &lt;/CardContent&gt;
&lt;/Card&gt;</code></pre>
							</div>
						</CardContent>
					</Card>

					<!-- Card with Footer -->
					<Card>
						<CardHeader>
							<CardTitle>Card with Footer</CardTitle>
							<CardDescription>Card including header, content, and footer sections</CardDescription>
						</CardHeader>
						<CardContent>
							<div class="space-y-4">
								<Card class="w-full max-w-sm">
									<CardHeader>
										<CardTitle>Product Card</CardTitle>
										<CardDescription>Premium subscription plan</CardDescription>
									</CardHeader>
									<CardContent>
										<div class="space-y-2">
											<p class="text-2xl font-bold">$29/month</p>
											<p class="text-sm text-muted-foreground">
												Access to all premium features and priority support.
											</p>
										</div>
									</CardContent>
									<CardFooter>
										<Button class="w-full">Subscribe Now</Button>
									</CardFooter>
								</Card>
								
								<pre class="bg-muted p-2 rounded text-xs overflow-x-auto"><code>&lt;Card&gt;
  &lt;CardHeader&gt;
    &lt;CardTitle&gt;Product Card&lt;/CardTitle&gt;
    &lt;CardDescription&gt;Premium subscription plan&lt;/CardDescription&gt;
  &lt;/CardHeader&gt;
  &lt;CardContent&gt;
    &lt;p class="text-2xl font-bold"&gt;$29/month&lt;/p&gt;
    &lt;p&gt;Access to all premium features.&lt;/p&gt;
  &lt;/CardContent&gt;
  &lt;CardFooter&gt;
    &lt;Button class="w-full"&gt;Subscribe Now&lt;/Button&gt;
  &lt;/CardFooter&gt;
&lt;/Card&gt;</code></pre>
							</div>
						</CardContent>
					</Card>

					<!-- Interactive Card -->
					<Card>
						<CardHeader>
							<CardTitle>Interactive Card</CardTitle>
							<CardDescription>Card with interactive elements and actions</CardDescription>
						</CardHeader>
						<CardContent>
							<div class="space-y-4">
								<Card class="w-full max-w-sm">
									<CardHeader>
										<div class="flex items-start justify-between">
											<div>
												<CardTitle>Article Title</CardTitle>
												<CardDescription>Published 2 hours ago</CardDescription>
											</div>
											<Badge>New</Badge>
										</div>
									</CardHeader>
									<CardContent>
										<p class="text-sm text-muted-foreground">
											This is a preview of the article content. Click to read more about this interesting topic.
										</p>
									</CardContent>
									<CardFooter class="flex justify-between">
										<div class="flex space-x-2">
											<Button variant="ghost" size="sm">
												<HeartIcon class="h-4 w-4 mr-1" />
												Like
											</Button>
											<Button variant="ghost" size="sm">
												<ShareIcon class="h-4 w-4 mr-1" />
												Share
											</Button>
										</div>
										<Button variant="outline" size="sm">Read More</Button>
									</CardFooter>
								</Card>
								
								<pre class="bg-muted p-2 rounded text-xs overflow-x-auto"><code>&lt;Card&gt;
  &lt;CardHeader&gt;
    &lt;div class="flex items-start justify-between"&gt;
      &lt;div&gt;
        &lt;CardTitle&gt;Article Title&lt;/CardTitle&gt;
        &lt;CardDescription&gt;Published 2 hours ago&lt;/CardDescription&gt;
      &lt;/div&gt;
      &lt;Badge&gt;New&lt;/Badge&gt;
    &lt;/div&gt;
  &lt;/CardHeader&gt;
  &lt;CardContent&gt;
    &lt;p&gt;Article preview content...&lt;/p&gt;
  &lt;/CardContent&gt;
  &lt;CardFooter class="flex justify-between"&gt;
    &lt;div class="flex space-x-2"&gt;
      &lt;Button variant="ghost" size="sm"&gt;Like&lt;/Button&gt;
      &lt;Button variant="ghost" size="sm"&gt;Share&lt;/Button&gt;
    &lt;/div&gt;
    &lt;Button variant="outline" size="sm"&gt;Read More&lt;/Button&gt;
  &lt;/CardFooter&gt;
&lt;/Card&gt;</code></pre>
							</div>
						</CardContent>
					</Card>

					<!-- Card Grid -->
					<Card>
						<CardHeader>
							<CardTitle>Card Layouts</CardTitle>
							<CardDescription>Different ways to arrange and style cards</CardDescription>
						</CardHeader>
						<CardContent>
							<div class="space-y-6">
								<!-- Grid Layout -->
								<div>
									<h4 class="font-medium mb-3">Grid Layout</h4>
									<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
										<Card>
											<CardHeader>
												<CardTitle class="text-lg">Feature 1</CardTitle>
											</CardHeader>
											<CardContent>
												<p class="text-sm text-muted-foreground">Description of feature 1</p>
											</CardContent>
										</Card>
										<Card>
											<CardHeader>
												<CardTitle class="text-lg">Feature 2</CardTitle>
											</CardHeader>
											<CardContent>
												<p class="text-sm text-muted-foreground">Description of feature 2</p>
											</CardContent>
										</Card>
									</div>
								</div>
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
							<CardDescription>Add the Card component to your project</CardDescription>
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
							<CardDescription>Import and use the Card component</CardDescription>
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
								<!-- Card -->
								<div>
									<h4 class="text-lg font-semibold mb-3">Card</h4>
									<p class="text-sm text-muted-foreground mb-3">The main card container component.</p>
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
												<tr>
													<td class="p-2 font-mono">class</td>
													<td class="p-2">string</td>
													<td class="p-2">""</td>
													<td class="p-2">Additional CSS classes</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>

								<!-- CardHeader -->
								<div>
									<h4 class="text-lg font-semibold mb-3">CardHeader</h4>
									<p class="text-sm text-muted-foreground mb-3">Container for card title and description.</p>
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
												<tr>
													<td class="p-2 font-mono">class</td>
													<td class="p-2">string</td>
													<td class="p-2">""</td>
													<td class="p-2">Additional CSS classes</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>

								<!-- CardTitle -->
								<div>
									<h4 class="text-lg font-semibold mb-3">CardTitle</h4>
									<p class="text-sm text-muted-foreground mb-3">The card title component.</p>
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
												<tr>
													<td class="p-2 font-mono">class</td>
													<td class="p-2">string</td>
													<td class="p-2">""</td>
													<td class="p-2">Additional CSS classes</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>

								<!-- CardDescription -->
								<div>
									<h4 class="text-lg font-semibold mb-3">CardDescription</h4>
									<p class="text-sm text-muted-foreground mb-3">The card description component.</p>
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
												<tr>
													<td class="p-2 font-mono">class</td>
													<td class="p-2">string</td>
													<td class="p-2">""</td>
													<td class="p-2">Additional CSS classes</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>

								<!-- CardContent -->
								<div>
									<h4 class="text-lg font-semibold mb-3">CardContent</h4>
									<p class="text-sm text-muted-foreground mb-3">The main content area of the card.</p>
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
												<tr>
													<td class="p-2 font-mono">class</td>
													<td class="p-2">string</td>
													<td class="p-2">""</td>
													<td class="p-2">Additional CSS classes</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>

								<!-- CardFooter -->
								<div>
									<h4 class="text-lg font-semibold mb-3">CardFooter</h4>
									<p class="text-sm text-muted-foreground mb-3">The footer area of the card, typically for actions.</p>
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
												<tr>
													<td class="p-2 font-mono">class</td>
													<td class="p-2">string</td>
													<td class="p-2">""</td>
													<td class="p-2">Additional CSS classes</td>
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
