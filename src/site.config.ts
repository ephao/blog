import type { SiteConfig } from "@/types";
import type { AstroExpressiveCodeOptions } from "astro-expressive-code";

export const siteConfig: SiteConfig = {
	// Used as both a meta property (src/components/BaseHead.astro L:31 + L:49) & the generated satori png (src/pages/og-image/[slug].png.ts)
	// author 字段对 SEO 有一定影响。它可以用于：
	// 1. 在网页的 meta 标签中设置作者信息，如 <meta name="author" content="Chris Williams">
	// 2. 在结构化数据（如 Schema.org）中标识内容创作者
	// 3. 在某些情况下，搜索引擎可能会使用这个信息来关联作者与其内容
	// 虽然不是最关键的 SEO 因素，但它有助于建立内容的可信度和权威性
	author: "Chris Williams",
	// Date.prototype.toLocaleDateString() parameters, found in src/utils/date.ts.
	date: {
		locale: "en-GB",
		options: {
			day: "numeric",
			month: "short",
			year: "numeric",
		},
	},
	// 用作默认的描述元属性和 webmanifest 描述
	// 在 src/components/BaseHead.astro 中用于 <meta name="description"> 标签
	// 在 astro.config.ts 中用于 webmanifest 配置
	// 对 SEO 很重要，应简洁地概括网站内容，通常建议在 150-160 字符以内
	description: "An opinionated starter theme for Astro",

	// HTML lang 属性，用于指定网页的主要语言
	// 在 src/layouts/Base.astro L:18 和 astro.config.ts L:48 中使用
	// 对 SEO 有影响，有助于搜索引擎理解网页内容的语言，从而为特定语言的用户提供更相关的搜索结果
	lang: "en-GB",

	// Open Graph 本地化设置，用于社交媒体分享
	// 在 src/components/BaseHead.astro L:42 中使用
	// 影响社交媒体分享时的 SEO，帮助平台显示适合特定地区用户的内容
	ogLocale: "en_GB",

	// 选项：是否按更新日期排序文章
	// 如果设置为 true（且属性存在），则按 updatedDate 排序；默认（false）按 publishDate 排序
	// 间接影响 SEO，因为搜索引擎通常更看重最近更新的内容
	sortPostsByUpdatedDate: false,
	// 用于构建以下内容：
	// 1. HTML <head> 中的 <title> 标签内容，以及 <meta name="title"> 标签的 content 属性值
	//    这些标签通常在 src/components/BaseHead.astro 文件中定义，用于设置网页的标题
	// 2. webmanifest 文件中的 name 字段，位于 astro.config.ts 文件中配置
	// 这个 title 对 SEO 非常重要，它影响搜索结果的显示和点击率
	// 一般建议使用 3-5 个词，既包含关键信息又保持简洁
	// 每个词都可能被视为独立的关键词，但应该共同描述网站的核心内容
	// 示例：主题名 + 框架 + 主要特性
	title: "Cactus Theme | Astro Blog",
	webmentions: {
		// Webmention.io API endpoint
		// 注意：将此字段设置为空字符串可能会影响网站的社交互动功能，但不会直接影响SEO
		// 如果您不打算使用Webmentions功能，保持为空是可以的
		// 但如果您计划在将来使用此功能，建议设置一个有效的endpoint
		link: "",
	},
};

// Used to generate links in both the Header & Footer.
export const menuLinks: { path: string; title: string }[] = [
	{
		path: "/",
		title: "Home",
	},
	{
		path: "/about/",
		title: "About",
	},
	{
		path: "/posts/",
		title: "Blog",
	},
];

// https://expressive-code.com/reference/configuration/
export const expressiveCodeOptions: AstroExpressiveCodeOptions = {
	styleOverrides: {
		borderRadius: "4px",
		codeFontFamily:
			'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;',
		codeFontSize: "0.875rem",
		codeLineHeight: "1.7142857rem",
		codePaddingInline: "1rem",
		frames: {
			frameBoxShadowCssValue: "none",
		},
		uiLineHeight: "inherit",
	},
	themeCssSelector(theme, { styleVariants }) {
		// If one dark and one light theme are available
		// generate theme CSS selectors compatible with cactus-theme dark mode switch
		if (styleVariants.length >= 2) {
			const baseTheme = styleVariants[0]?.theme;
			const altTheme = styleVariants.find((v) => v.theme.type !== baseTheme?.type)?.theme;
			if (theme === baseTheme || theme === altTheme) return `[data-theme='${theme.type}']`;
		}
		// return default selector
		return `[data-theme="${theme.name}"]`;
	},
	// One dark, one light theme => https://expressive-code.com/guides/themes/#available-themes
	themes: ["dracula", "github-light"],
	useThemedScrollbars: false,
};
