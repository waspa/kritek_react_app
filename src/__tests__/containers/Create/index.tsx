import React from "react";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { render } from "../../../../mocks/test-utils";
import { frameworksPath } from "../../../../mocks/handlers";
import { server } from "../../../../mocks/server";
import { rest } from "msw";
import { frameworksData } from "../../../../mocks/mockData";
import CreateFramework from "../../../../containers/Framework/components/CreateView";

describe("Framework Create Page", () => {
	it("should render a form", async () => {
		render(<CreateFramework />);

		const headerElement = await screen.findByText(/Create framework/i);
		expect(headerElement).toBeVisible();

		const titleInputElement = screen.getByPlaceholderText(/Enter the title/i);
		expect(titleInputElement).toBeVisible();

		const descriptionInputElement = screen.getByPlaceholderText(
			/Enter the description/i,
		);
		expect(descriptionInputElement).toBeVisible();

		const creatorInputElement =
			screen.getByPlaceholderText(/Enter the creator/i);
		expect(creatorInputElement).toBeVisible();

		const sourceInputElement =
			screen.getByPlaceholderText(/Enter the source url/i);
		expect(sourceInputElement).toBeVisible();

		const buttonElement = screen.getByRole("button", {
			name: /create/i,
		});
		expect(buttonElement).toBeVisible();

		const cancelButtonElement = screen.getByRole("button", {
			name: /cancel/i,
		});
		expect(cancelButtonElement).toBeVisible();
	});

	it("user should click create button, an error should be rendered", async () => {
		render(<CreateFramework />);

		const inputElement = await screen.findByPlaceholderText(/Enter the title/i);
		expect(inputElement).toBeVisible();

		const buttonElement = screen.getByRole("button", {
			name: /create/i,
		});
		expect(buttonElement).toBeVisible();

		fireEvent.click(buttonElement);
		await waitFor(() =>
			expect(screen.getByText(/title is required/i)).toBeInTheDocument(),
		);
	});

	it("the user should be able to create workspace if no workspaces exist", async () => {
		render(<CreateFramework />);

		const inputElement = await screen.findByPlaceholderText(/Enter the title/i);
		expect(inputElement).toBeVisible();

		await waitFor(() =>
			fireEvent.change(inputElement, {
				target: { value: "Myfirstframework" },
			}),
		);

		const buttonElement = await screen.getByRole("button", {
			name: /create/i,
		});
		expect(buttonElement).toBeVisible();

		await waitFor(() => fireEvent.click(buttonElement));

		server.use(
			rest.get(frameworksPath, (req, res, ctx) =>
				res(ctx.status(200), ctx.json(frameworksData)),
			),
		);
	});
});
