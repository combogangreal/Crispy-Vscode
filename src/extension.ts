import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('crispy-vscode.generatePyProject', () => {
		
	});

	context.subscriptions.push(disposable);
}
export function deactivate() {}