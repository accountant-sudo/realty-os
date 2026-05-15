-- Rename tables
ALTER TABLE "User"        RENAME TO users;
ALTER TABLE "Agent"       RENAME TO agents;
ALTER TABLE "Realtor"     RENAME TO realtors;
ALTER TABLE "MlsProperty" RENAME TO mls_properties;
ALTER TABLE "Operation"   RENAME TO operations;

-- ── mls_properties: camelCase → snake_case ──────────────────────────────────
ALTER TABLE mls_properties RENAME COLUMN "listPrice"       TO list_price;
ALTER TABLE mls_properties RENAME COLUMN "agentRaw"        TO agent_raw;
ALTER TABLE mls_properties RENAME COLUMN "listingExp"      TO listing_exp;
ALTER TABLE mls_properties RENAME COLUMN "listingStart"    TO listing_start;
ALTER TABLE mls_properties RENAME COLUMN "showingInst"     TO showing_inst;
ALTER TABLE mls_properties RENAME COLUMN "mlsStatus"       TO mls_status;
ALTER TABLE mls_properties RENAME COLUMN "mlsNum"          TO mls_num;
ALTER TABLE mls_properties RENAME COLUMN "usState"         TO us_state;
ALTER TABLE mls_properties RENAME COLUMN "daysListed"      TO days_listed;
ALTER TABLE mls_properties RENAME COLUMN "zillowViews"     TO zillow_views;
ALTER TABLE mls_properties RENAME COLUMN "tourLink"        TO tour_link;
ALTER TABLE mls_properties RENAME COLUMN "tour360"         TO tour_360;
ALTER TABLE mls_properties RENAME COLUMN "createdAt"       TO created_at;
ALTER TABLE mls_properties RENAME COLUMN "updatedAt"       TO updated_at;
ALTER TABLE mls_properties RENAME COLUMN "deletedAt"       TO deleted_at;

-- mls_properties: Spanish → English
ALTER TABLE mls_properties RENAME COLUMN "tipologia"       TO typology;
ALTER TABLE mls_properties RENAME COLUMN "renta"           TO rental_status;
ALTER TABLE mls_properties RENAME COLUMN "rentaEstimada"   TO rental_estimate;
ALTER TABLE mls_properties RENAME COLUMN "rentaFinContrato" TO rental_contract_end;
ALTER TABLE mls_properties RENAME COLUMN "impuestoAnual"   TO annual_tax;
ALTER TABLE mls_properties RENAME COLUMN "sellerNombre"    TO seller_name;
ALTER TABLE mls_properties RENAME COLUMN "sellerTelefono"  TO seller_phone;
ALTER TABLE mls_properties RENAME COLUMN "sellerEmail"     TO seller_email;
ALTER TABLE mls_properties RENAME COLUMN "propietario"     TO owner_name;
ALTER TABLE mls_properties RENAME COLUMN "barrio"          TO neighborhood;
ALTER TABLE mls_properties RENAME COLUMN "ambientes"       TO rooms;
ALTER TABLE mls_properties RENAME COLUMN "dormitorios"     TO bedrooms;
ALTER TABLE mls_properties RENAME COLUMN "banos"           TO bathrooms;
ALTER TABLE mls_properties RENAME COLUMN "toilettes"       TO toilets;
ALTER TABLE mls_properties RENAME COLUMN "cocheras"        TO parking_spots;
ALTER TABLE mls_properties RENAME COLUMN "condicion"       TO condition;
ALTER TABLE mls_properties RENAME COLUMN "plantas"         TO floors;
ALTER TABLE mls_properties RENAME COLUMN "antiguedad"      TO building_age;
ALTER TABLE mls_properties RENAME COLUMN "situacion"       TO occupancy_status;
ALTER TABLE mls_properties RENAME COLUMN "expensas"        TO hoa_fees;
ALTER TABLE mls_properties RENAME COLUMN "orientacion"     TO orientation;
ALTER TABLE mls_properties RENAME COLUMN "disposicion"     TO layout;
ALTER TABLE mls_properties RENAME COLUMN "supCubierta"     TO covered_area;
ALTER TABLE mls_properties RENAME COLUMN "supSemicubierta" TO semi_covered_area;
ALTER TABLE mls_properties RENAME COLUMN "supTotal"        TO total_area;
ALTER TABLE mls_properties RENAME COLUMN "supDescubierta"  TO open_area;

-- ── operations: camelCase → snake_case ──────────────────────────────────────
ALTER TABLE operations RENAME COLUMN "titleCo"            TO title_company;
ALTER TABLE operations RENAME COLUMN "clientId"           TO client_id;
ALTER TABLE operations RENAME COLUMN "buyerName"          TO buyer_name;
ALTER TABLE operations RENAME COLUMN "execDate"           TO exec_date;
ALTER TABLE operations RENAME COLUMN "closingDate"        TO closing_date;
ALTER TABLE operations RENAME COLUMN "closingDateISO"     TO closing_date_iso;
ALTER TABLE operations RENAME COLUMN "commissionPaid"     TO commission_paid;
ALTER TABLE operations RENAME COLUMN "compSigned"         TO comp_signed;
ALTER TABLE operations RENAME COLUMN "compPct"            TO comp_pct;
ALTER TABLE operations RENAME COLUMN "compFixed"          TO comp_fixed;
ALTER TABLE operations RENAME COLUMN "condoDocs"          TO condo_docs;
ALTER TABLE operations RENAME COLUMN "condoRider"         TO condo_rider;
ALTER TABLE operations RENAME COLUMN "inspDone"           TO insp_done;
ALTER TABLE operations RENAME COLUMN "inspStatus"         TO insp_status;
ALTER TABLE operations RENAME COLUMN "inspNotes"          TO insp_notes;
ALTER TABLE operations RENAME COLUMN "reinsp"             TO reinspection;
ALTER TABLE operations RENAME COLUMN "closingNear"        TO closing_near;
ALTER TABLE operations RENAME COLUMN "isRented"           TO is_rented;
ALTER TABLE operations RENAME COLUMN "leaseAgreementSent" TO lease_agreement_sent;
ALTER TABLE operations RENAME COLUMN "estoppelSent"       TO estoppel_sent;
ALTER TABLE operations RENAME COLUMN "createdAt"          TO created_at;
ALTER TABLE operations RENAME COLUMN "updatedAt"          TO updated_at;
ALTER TABLE operations RENAME COLUMN "deletedAt"          TO deleted_at;

-- ── users: camelCase → snake_case ───────────────────────────────────────────
ALTER TABLE users RENAME COLUMN "createdAt" TO created_at;
ALTER TABLE users RENAME COLUMN "updatedAt" TO updated_at;
