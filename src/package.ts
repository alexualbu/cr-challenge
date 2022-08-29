import { maxSatisfying } from 'semver';
import got from 'got';

export const getPackage = async function (req, res, next) {
  const { name, version } = req.params;
  const dependencyTree = {};
  try {
    const npmPackage: any = await got(
        `https://registry.npmjs.org/${name}`,
    ).json();

    const dependencies: any =
        npmPackage.versions[version].dependencies ?? {};
    for (const [name, range] of Object.entries(dependencies)) {
      const subDep = await getDependencies(name, range);
      dependencyTree[name] = subDep;
    }

    return res
        .status(200)
        .json({ name, version, dependencies: dependencyTree });
  } catch (error) {
    return next(error);
  }
};

async function getDependencies(name: any, range: any): Promise<any> {
  const npmPackage: any = await got(
      `https://registry.npmjs.org/${name}`,
  ).json();

  const v = maxSatisfying(Object.keys(npmPackage.versions), range);
  const dependencies: any = {};

  if (v) {
    const newDeps = npmPackage.versions[v].dependencies;
    for (const [name, range] of Object.entries(newDeps ?? {})) {
      dependencies[name] = await getDependencies(name, range);
    }
  }

  return { version: v ?? range, dependencies };
}