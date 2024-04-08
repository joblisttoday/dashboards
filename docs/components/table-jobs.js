import * as Inputs from "npm:@observablehq/inputs";
import { html } from "npm:htl";

export default function tableJobs(data = [], size = {}) {
	const $table = Inputs.table(data, {
		format: {
			company_id: (x) =>
				html`<a href="https://joblist.today/${x}">${x}</a>`,
			url: (x) => html`<a href="${x}">${x}</a>`,
		},
	});
	return $table;
}
