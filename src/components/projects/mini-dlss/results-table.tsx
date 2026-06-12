import type { MiniDlssResult } from "@/content/mini-dlss";

type ResultsTableProps = {
  results: MiniDlssResult[];
};

export function ResultsTable({ results }: ResultsTableProps) {
  return (
    <div className="results-table" role="region" aria-label="Model results">
      <table>
        <caption>
          Local Vimeo-derived REDS-style validation results. These are not
          official REDS benchmark measurements.
        </caption>
        <thead>
          <tr>
            <th scope="col">Method</th>
            <th scope="col">PSNR-Y</th>
            <th scope="col">SSIM-Y</th>
            <th scope="col">tPSNR</th>
            <th scope="col">Diff. energy</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr
              key={result.method}
              className={
                result.highlight ? "results-table__highlight" : undefined
              }
            >
              <th scope="row">
                {result.method}
                {result.note ? <span>{result.note}</span> : null}
              </th>
              <td>{result.psnrY}</td>
              <td>{result.ssimY}</td>
              <td>{result.tpsnr}</td>
              <td>{result.diffEnergy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
