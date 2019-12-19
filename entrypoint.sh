cd kibana
git checkout $VERSION
yarn kbn bootstrap
yarn es source
node scripts/makelogs
node scripts/generate_plugin $PLUGIN