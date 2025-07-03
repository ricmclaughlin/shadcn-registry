<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { themeStore, themes } from '$lib/stores/theme';
	import { Input, Label } from '$lib/components/ui/input';
	import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	
	// Icon imports
	import SearchIcon from '@lucide/svelte/icons/search';
	import EyeIcon from '@lucide/svelte/icons/eye';
	import EyeOffIcon from '@lucide/svelte/icons/eye-off';
	import CopyIcon from '@lucide/svelte/icons/copy';
	
	let currentTheme = 'default';
	let copied = false;
	let showPassword = false;
	let searchValue = '';
	let emailValue = '';
	let passwordValue = '';
	
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
	
	const installCommand = `npx shadcn-svelte@latest add ${registryBaseUrl}/r/input.json`;
	const usageExample = `<script lang="ts">
  import { Input, Label } from "$lib/components/ui/input";
<\/script>

<div class="space-y-2">
  <Label for="email">Email</Label>
  <Input id="email" type="email" placeholder="Enter your email" />
</div>`;
</script>

<svelte:head>
	<title>Input Component - UI Registry</title>
	<meta name="description" content="A flexible input component with support for various types and states." />
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
					<Breadcrumb.Page>Input</Breadcrumb.Page>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb.Root>
	</div>

	<!-- Hero Section -->
	<section class="py-12 px-4">
		<div class="container mx-auto">
			<div class="max-w-4xl mx-auto text-center">
				<div class="flex items-center justify-center space-x-2 mb-4">
					<h1 class="text-4xl md:text-5xl font-bold text-foreground">Input</h1>
					<Badge variant="secondary">Component</Badge>
				</div>
				<p class="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
					A flexible input component with support for various types and states.
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
					<!-- Basic Input -->
					<Card>
						<CardHeader>
							<CardTitle>Basic Input</CardTitle>
							<CardDescription>Simple input fields with labels</CardDescription>
						</CardHeader>
						<CardContent>
							<div class="space-y-6">
								<div class="grid md:grid-cols-2 gap-6">
									<!-- Text Input -->
									<div class="space-y-2">
										<Label for="name">Name</Label>
										<Input id="name" type="text" placeholder="Enter your name" />
									</div>

									<!-- Email Input -->
									<div class="space-y-2">
										<Label for="email-example">Email</Label>
										<Input id="email-example" type="email" placeholder="Enter your email" bind:value={emailValue} />
									</div>
								</div>
								
								<pre class="bg-muted p-2 rounded text-xs overflow-x-auto"><code>&lt;div class="space-y-2"&gt;
  &lt;Label for="email"&gt;Email&lt;/Label&gt;
  &lt;Input id="email" type="email" placeholder="Enter your email" /&gt;
&lt;/div&gt;</code></pre>
							</div>
						</CardContent>
					</Card>

					<!-- Input Types -->
					<Card>
						<CardHeader>
							<CardTitle>Input Types</CardTitle>
							<CardDescription>Different input types for various data</CardDescription>
						</CardHeader>
						<CardContent>
							<div class="space-y-6">
								<div class="grid md:grid-cols-2 gap-6">
									<!-- Password Input -->
									<div class="space-y-2">
										<Label for="password">Password</Label>
										<div class="relative">
											<Input 
												id="password" 
												type={showPassword ? "text" : "password"} 
												placeholder="Enter password" 
												bind:value={passwordValue}
											/>
											<button
												type="button"
												class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
												on:click={() => showPassword = !showPassword}
											>
												{#if showPassword}
													<EyeOffIcon class="h-4 w-4" />
												{:else}
													<EyeIcon class="h-4 w-4" />
												{/if}
											</button>
										</div>
									</div>

									<!-- Number Input -->
									<div class="space-y-2">
										<Label for="age">Age</Label>
										<Input id="age" type="number" placeholder="Enter your age" min="0" max="120" />
									</div>

									<!-- Date Input -->
									<div class="space-y-2">
										<Label for="birthdate">Birth Date</Label>
										<Input id="birthdate" type="date" />
									</div>

									<!-- Search Input -->
									<div class="space-y-2">
										<Label for="search">Search</Label>
										<div class="relative">
											<SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
											<Input 
												id="search" 
												type="search" 
												placeholder="Search..." 
												class="pl-10"
												bind:value={searchValue}
											/>
										</div>
									</div>
								</div>
								
								<pre class="bg-muted p-2 rounded text-xs overflow-x-auto"><code>&lt;div class="space-y-2"&gt;
  &lt;Label for="password"&gt;Password&lt;/Label&gt;
  &lt;Input id="password" type="password" placeholder="Enter password" /&gt;
&lt;/div&gt;</code></pre>
							</div>
						</CardContent>
					</Card>

					<!-- Input States -->
					<Card>
						<CardHeader>
							<CardTitle>Input States</CardTitle>
							<CardDescription>Different states and validation styles</CardDescription>
						</CardHeader>
						<CardContent>
							<div class="space-y-6">
								<div class="grid md:grid-cols-2 gap-6">
									<!-- Disabled Input -->
									<div class="space-y-2">
										<Label for="disabled">Disabled Input</Label>
										<Input id="disabled" type="text" placeholder="Disabled input" disabled />
									</div>

									<!-- Readonly Input -->
									<div class="space-y-2">
										<Label for="readonly">Readonly Input</Label>
										<Input id="readonly" type="text" value="Read-only value" readonly />
									</div>

									<!-- Required Input -->
									<div class="space-y-2">
										<Label for="required">Required Input *</Label>
										<Input id="required" type="text" placeholder="This field is required" required />
									</div>

									<!-- Input with Error -->
									<div class="space-y-2">
										<Label for="error" class="text-destructive">Email (Error)</Label>
										<Input 
											id="error" 
											type="email" 
											placeholder="invalid-email" 
											class="border-destructive focus:ring-destructive"
										/>
										<p class="text-sm text-destructive">Please enter a valid email address</p>
									</div>
								</div>
								
								<pre class="bg-muted p-2 rounded text-xs overflow-x-auto"><code>&lt;Input disabled placeholder="Disabled input" /&gt;
&lt;Input readonly value="Read-only value" /&gt;
&lt;Input required placeholder="Required field" /&gt;</code></pre>
							</div>
						</CardContent>
					</Card>

					<!-- Input Sizes -->
					<Card>
						<CardHeader>
							<CardTitle>Input Sizes</CardTitle>
							<CardDescription>Different input sizes for various contexts</CardDescription>
						</CardHeader>
						<CardContent>
							<div class="space-y-4">
								<div class="space-y-2">
									<Label>Small Input</Label>
									<Input placeholder="Small input" class="h-8 text-sm" />
								</div>
								
								<div class="space-y-2">
									<Label>Default Input</Label>
									<Input placeholder="Default input" />
								</div>
								
								<div class="space-y-2">
									<Label>Large Input</Label>
									<Input placeholder="Large input" class="h-12 text-lg" />
								</div>
								
								<pre class="bg-muted p-2 rounded text-xs overflow-x-auto"><code>&lt;Input placeholder="Small" class="h-8 text-sm" /&gt;
&lt;Input placeholder="Default" /&gt;
&lt;Input placeholder="Large" class="h-12 text-lg" /&gt;</code></pre>
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
							<CardDescription>Add the Input component to your project</CardDescription>
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
							<CardDescription>Import and use the Input component</CardDescription>
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
								<!-- Input -->
								<div>
									<h4 class="text-lg font-semibold mb-3">Input</h4>
									<p class="text-sm text-muted-foreground mb-3">The main input component.</p>
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
													<td class="p-2 font-mono">type</td>
													<td class="p-2">string</td>
													<td class="p-2">"text"</td>
													<td class="p-2">HTML input type</td>
												</tr>
												<tr class="border-b">
													<td class="p-2 font-mono">placeholder</td>
													<td class="p-2">string</td>
													<td class="p-2">""</td>
													<td class="p-2">Placeholder text</td>
												</tr>
												<tr class="border-b">
													<td class="p-2 font-mono">value</td>
													<td class="p-2">string</td>
													<td class="p-2">""</td>
													<td class="p-2">Input value</td>
												</tr>
												<tr class="border-b">
													<td class="p-2 font-mono">disabled</td>
													<td class="p-2">boolean</td>
													<td class="p-2">false</td>
													<td class="p-2">Whether input is disabled</td>
												</tr>
												<tr class="border-b">
													<td class="p-2 font-mono">readonly</td>
													<td class="p-2">boolean</td>
													<td class="p-2">false</td>
													<td class="p-2">Whether input is readonly</td>
												</tr>
												<tr class="border-b">
													<td class="p-2 font-mono">required</td>
													<td class="p-2">boolean</td>
													<td class="p-2">false</td>
													<td class="p-2">Whether input is required</td>
												</tr>
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

								<!-- Label -->
								<div>
									<h4 class="text-lg font-semibold mb-3">Label</h4>
									<p class="text-sm text-muted-foreground mb-3">The label component for inputs.</p>
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
													<td class="p-2 font-mono">for</td>
													<td class="p-2">string</td>
													<td class="p-2">""</td>
													<td class="p-2">ID of associated input</td>
												</tr>
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
