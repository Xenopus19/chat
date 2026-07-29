interface FormatDateConfig {
	fallback?: string;
	locale?: Intl.LocalesArgument;
	options?: Intl.DateTimeFormatOptions;
}

const defaultOptions: Intl.DateTimeFormatOptions = {
	year: "numeric",
	month: "short",
	day: "2-digit",
};

export const formatDate = (value: string, config: FormatDateConfig = {}) => {
	const { fallback = "Unknown date", locale, options = defaultOptions } = config;

	if (!value) {
		return fallback;
	}

	const date = new Date(value);
	if (Number.isNaN(date.getTime())) {
		return fallback;
	}

	return new Intl.DateTimeFormat(locale, options).format(date);
};
