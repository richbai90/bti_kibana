#!/bin/bash
for file in $HOME/plugins/*.zip
do
    rm -rf $HOME/kibana/optimize/bundles
    timeout 300 $HOME/kibana/bin/kibana-plugin install file://$file
    echo "$file - $?" >> $HOME/plugins/install.log
done


