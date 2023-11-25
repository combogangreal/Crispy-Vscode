import { exec } from "child_process";

export async function getGitUsername(): Promise<string> {
  return new Promise((resolve, reject) => {
    exec('git config --global user.name', (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

export async function getGitEmail(): Promise<string> {
  return new Promise((resolve, reject) => {
    exec('git config --global user.email', (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout.trim());
      }
    });
  })
}