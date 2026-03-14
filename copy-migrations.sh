#!/bin/sh

echo "Copying prisma migration files..."

MIGRATIONS_TARGET=${CONFIGURATION_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}

rm -rf "$MIGRATIONS_TARGET/migrations"
cp -r ${SRCROOT}/../prisma/migrations "${MIGRATIONS_TARGET}/migrations"

echo "migration files copied ✅"