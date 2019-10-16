#! /bin/bash
set -e

BASE_DIR="$(dirname $( cd "$(dirname "$0")" ; pwd -P ))"

pushd ${BASE_DIR}/client
    yarn install
    yarn build
popd

pushd ${BASE_DIR}
   mvn -Dflyway.user=${PIE_DB_USERNAME} -Dflyway.password= -Dflyway.url=${PIE_DB_URL} clean flyway:migrate package -DskipTests
    rm ${BASE_DIR}/artifacts/pie.jar || true
    cp ${BASE_DIR}/target/pie-[0-9\.]*-SNAPSHOT.jar ${BASE_DIR}/artifacts/pie.jar
popd

#pushd ${BASE_DIR}
#    rm ${BASE_DIR}/artifacts/pie.jar || true
#    cp ${BASE_DIR}/target/pie-[0-9\.]*-SNAPSHOT.jar ${BASE_DIR}/artifacts/pie.jar
#popd


#
#
#set -e
#
#BASE_DIR="$(dirname $( cd "$(dirname "$0")" ; pwd -P ))"
#
#pushd ${BASE_DIR}/client
#    yarn install
#    yarn build
#popd
#
#pushd ${BASE_DIR}
#    mvn -Dflyway.user=${PIE_DB_USERNAME} -Dflyway.password= -Dflyway.url=${PIE_DB_URL} clean flyway:migrate package -DskipTests
#    rm ${BASE_DIR}/artifacts/pie.jar || true
#    cp ${BASE_DIR}/target/pie-[0-9\.]*-SNAPSHOT.jar ${BASE_DIR}/artifacts/pie.jar
#popd
