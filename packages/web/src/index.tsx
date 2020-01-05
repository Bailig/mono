import React, { FC } from 'react';
import { getPackageName as getServerName } from '@mono/server';
import a from './script';

console.log(getServerName());
console.log(a);

export type GetPackageName = () => string
export const App: FC = () => <div />;
const getPackageName: GetPackageName = () => '@mono/web';

export default getPackageName;
