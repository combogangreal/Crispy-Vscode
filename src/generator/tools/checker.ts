import { execSync, exec } from 'child_process';
import { BlackError, PythonError } from './errors';


export async function checkPythonVersion(): Promise<{ pythonInstalled: boolean; error: Error | null }> {
  let pythonInstalled = false;
  let error: Error | null = null;

  try {
    const output = await execSync('python --version').toString();
    if (!output.startsWith('Python 3.8')) {
      error = new PythonError("PYTHON_UNSUPPORTED", "Please udpdate your python version too 3.8+ and retry!")
    } else {
      pythonInstalled = true;
    }
  } catch (err) {
    throw new PythonError("PYTHON_NOT_INSTALLED", "Python isn't installed on your machine, please install python 3.8+ and retry!", err);
  }

  return { pythonInstalled, error };
}

export async function checkBlackInstalled(): Promise<boolean> {
  if (process.platform === "win32") {
    const output = execSync("python ./black.py").toString();
    if (output === "True") {
      return true
    } else {
      throw new BlackError("BLACK_UNINSTALLED", "Black installation couldn't be found, `Please install black through pip too continue", 0)
      return false
    }
  } else {
    const output = execSync("python3 ./black.py").toString();
    if (output === "True") {
      return true
    } else {
      throw new BlackError("BLACK_UNINSTALLED", "Black installation couldn't be found, Please install black through pip too continue", 0)
      return false
    }
  }
  return false
}

export async function precommitInstall(): Promise<void> {
  return new Promise((resolve, reject) => {
    exec('pre-commit install', (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        console.log(stdout);
        resolve();
      }
    });
  });
}

export async function executeTox(): Promise<void> {
  return new Promise((resolve, reject) => {
    exec('tox', (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        console.log(stdout);
        resolve();
      }
    });
  });
}

export async function initGitRepository(): Promise<void> {
  return new Promise((resolve, reject) => {
    exec(`git init`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        console.log(stdout);
        resolve();
      }
    });
  });
}

export async function installVenv(venvname: string, path: string): Promise<void> {
  return new Promise((resolve, reject) => {
    exec(`cd ${path}`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        console.log(stdout);
        resolve();
      }
    });
    if (process.platform === "win32") {
      exec(`python -m venv ${venvname}`, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          console.log(stdout);
          resolve();
        }
      });
      exec(`./${venvname}/Scripts/activate`, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          console.log(stdout);
          resolve();
        }
      });
    } else {
      exec(`python3 -m venv ${venvname}`, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          console.log(stdout);
          resolve();
        }
      });
      exec(`source ${venvname}/bin/activate`, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          console.log(stdout);
          resolve();
        }
      });
    } 
  });
}

export async function buildSphinxDocs(project_path: string): Promise<void> {
  return new Promise((resolve, reject) => {
    exec(`cd ${project_path}/docs`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        console.log(stdout);
        resolve();
      }
    });
    exec(`make html`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        console.log(stdout);
        resolve();
      }
    })
  });
}