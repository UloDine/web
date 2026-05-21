export type ExportFormat = "json" | "csv" | "tsv" | "xlsx";

function escapeCsv(value: unknown) {
  if (value === null || value === undefined) return "";
  const s = String(value);
  if (
    s.includes('"') ||
    s.includes(",") ||
    s.includes("\n") ||
    s.includes("\r")
  ) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function toCsv(records: Record<string, unknown>[], delimiter = ",") {
  if (!records || records.length === 0) return "";
  const headers: string[] = [];
  for (const r of records) {
    for (const k of Object.keys(r)) {
      if (!headers.includes(k)) headers.push(k);
    }
  }

  const rows = [headers.join(delimiter)];
  for (const r of records) {
    const cols = headers.map((h) => escapeCsv(r[h]));
    rows.push(cols.join(delimiter));
  }
  return rows.join("\n");
}

function toExcelXml(records: Record<string, unknown>[]) {
  // Spreadsheet XML (Excel 2003 XML) format
  if (!records) records = [];
  const headers: string[] = [];
  for (const r of records) {
    for (const k of Object.keys(r)) {
      if (!headers.includes(k)) headers.push(k);
    }
  }

  const escapeXml = (s: unknown) =>
    String(s === undefined || s === null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

  const rows: string[] = [];
  // header row
  rows.push(
    `<Row>${headers
      .map((h) => `<Cell><Data ss:Type="String">${escapeXml(h)}</Data></Cell>`)
      .join("")}</Row>`,
  );

  for (const r of records) {
    const cells = headers
      .map(
        (h) => `<Cell><Data ss:Type="String">${escapeXml(r[h])}</Data></Cell>`,
      )
      .join("");
    rows.push(`<Row>${cells}</Row>`);
  }

  const xml =
    `<?xml version="1.0"?>\n` +
    `<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" ` +
    `xmlns:o="urn:schemas-microsoft-com:office:office" ` +
    `xmlns:x="urn:schemas-microsoft-com:office:excel" ` +
    `xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">\n` +
    `<Worksheet ss:Name="Sheet1">\n<Table>\n` +
    rows.join("\n") +
    `\n</Table>\n</Worksheet>\n</Workbook>`;

  return xml;
}

export function createExportPayload(
  records: Record<string, unknown>[],
  format: ExportFormat = "json",
  filenameBase = "export",
) {
  const fmt = (format || "json").toLowerCase() as ExportFormat;

  if (fmt === "json") {
    const data = JSON.stringify(records || [], null, 2);
    return {
      filename: `${filenameBase}.json`,
      mimeType: "application/json",
      data,
    };
  }

  if (fmt === "csv" || fmt === "tsv") {
    const delimiter = fmt === "csv" ? "," : "\t";
    const data = toCsv(records || [], delimiter);
    return {
      filename: `${filenameBase}.${fmt}`,
      mimeType: fmt === "csv" ? "text/csv" : "text/tab-separated-values",
      data,
    };
  }

  if (fmt === "xlsx") {
    const data = toExcelXml(records || []);
    return {
      filename: `${filenameBase}.xlsx`,
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      data,
    };
  }

  // fallback to json
  return {
    filename: `${filenameBase}.json`,
    mimeType: "application/json",
    data: JSON.stringify(records || [], null, 2),
  };
}

export default createExportPayload;
