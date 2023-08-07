<?php
namespace App\Http\Controllers\Traits;

trait CreatesDownloadableFiles
{
    /**
     * Create a line based on extension.
     *
     * @param array $row
     * @param string $extension tsv or csv
     * @return string
     */
    protected function line(array $row, $extension)
    {
        switch ($extension) {
            case "tsv":
                return $this->tsvLine($row);
                break;
            case "csv":
                return $this->csvLine($row);
                break;
        }

        return '';
    }

    /**
     * Create a CSV line from array.
     *
     * @param array $row
     * @return string
     */
    protected function csvLine(array $row)
    {
//        info(implode(',', $row));
        foreach ($row as $key => $value) {
//            info('creating CSV line of ' . $key . ' => ' . $value);
            // Remove all quotes from the string since that's against csv specs
            $row[$key] = '"'.str_replace('"', '', $value).'"';
        }

        return implode(",", $row)."\n";
    }

    /**
     * Create a TSV line from array.
     *
     * @param array $row
     * @return string
     */
    protected function tsvLine(array $row)
    {
        return implode("\t", $row)."\n";
    }
}
