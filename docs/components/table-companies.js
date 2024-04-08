import * as Inputs from "npm:@observablehq/inputs";
import { html } from "npm:htl";

const formatAnchor = (x) => html`<a href="${x}">${x}</a>`;
const formatAnchorCompanyIdProfile = (x) =>
	html`<a href="https://joblist.today/${x}">${x}</a>`;

export default function tableJobs(data = [], size = {}) {
	return Inputs.table(data, {
		format: {
			id: formatAnchorCompanyIdProfile,
			job_board_url: formatAnchor,
			company_url: formatAnchor,
			twitter_url: formatAnchor,
			wikipedia_url: formatAnchor,
			github_url: formatAnchor,
			linkedin_url: formatAnchor,
			youtube_url: formatAnchor,
			instagram_url: formatAnchor,
		},
	});
}
